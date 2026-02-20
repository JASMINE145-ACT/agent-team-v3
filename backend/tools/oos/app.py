"""
Streamlit 主应用
"""
import inspect
import streamlit as st
import pandas as pd
import logging
import tempfile
from datetime import datetime
import sys
from pathlib import Path

# 需从项目根目录运行，如：python -m streamlit run backend/tools/oos/app.py
from backend.tools.oos.processor import QuotationProcessor
from backend.tools.oos.models import ProcessingResult
from backend.tools.oos.services.agent_runner import run_quotation_agent

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 页面配置
st.set_page_config(
    page_title="报价单无货产品追踪系统",
    page_icon="📦",
    layout="wide",
    initial_sidebar_state="expanded"
)

# 初始化 Session State
if "processing_results" not in st.session_state:
    st.session_state.processing_results = {}

# 初始化处理器
@st.cache_resource
def get_processor():
    """缓存处理器实例"""
    return QuotationProcessor()

processor = get_processor()

# 主页面
st.title("📦 报价单无货产品追踪系统")
st.markdown("---")

# 侧边栏：导航
st.sidebar.title("导航")
page = st.sidebar.selectbox(
    "选择页面",
    ["上传文件", "按文件查看", "无货产品列表", "统计信息"]
)

# 文件上传页面
if page == "上传文件":
    st.subheader("上传 Excel 报价单")
    
    analysis_mode = st.radio(
        "分析方式",
        ["管道（原：数据段 + LLM 结构化提取）", "Agent（按格解析无货，思考 + 工具）"],
        horizontal=True,
        help="Agent 方式与 opencode_style_agent 一致：按单元格扫无货、可兜底智谱不走 tool_calls",
    )
    use_agent = "Agent" in analysis_mode

    uploaded_file = st.file_uploader(
        "选择文件",
        type=["xlsx", "xls"],
        help="支持 .xlsx 和 .xls 格式"
    )
    
    if uploaded_file is not None:
        # 显示文件信息
        col1, col2, col3 = st.columns(3)
        with col1:
            st.info(f"📄 文件名：{uploaded_file.name}")
        with col2:
            file_size_mb = uploaded_file.size / (1024 * 1024)
            st.info(f"📊 文件大小：{file_size_mb:.2f} MB")
        with col3:
            st.info(f"🕐 上传时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        agent_question = ""
        if use_agent:
            agent_question = st.text_input(
                "向 Agent 提问",
                value="抓取这份报价单的无货数据，你观察后决定哪些要存库，把选中的持久化到数据库。",
                key="agent_question",
            )
        
        if st.button("🚀 开始处理", type="primary", width="stretch"):
            with st.spinner("⏳ 正在处理，请稍候..."):
                try:
                    file_bytes = uploaded_file.read()

                    if use_agent:
                        # Agent 方式：落盘到临时路径后跑 run_quotation_agent（前端只传文件）
                        with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as tmp:
                            tmp.write(file_bytes)
                            tmp_path = tmp.name
                        try:
                            default_q = "抓取这份报价单的无货数据，你观察后决定哪些要存库，把选中的持久化到数据库。"
                            kwargs = {"file_path": tmp_path, "question": agent_question or default_q}
                            if "file_name" in inspect.signature(run_quotation_agent).parameters:
                                kwargs["file_name"] = uploaded_file.name
                            out = run_quotation_agent(**kwargs)
                            if out.get("error"):
                                st.error(f"❌ {out['error']}")
                            else:
                                if out.get("thinking"):
                                    with st.expander("🔍 思考过程", expanded=False):
                                        st.text(out["thinking"])
                                st.success("✅ Agent 分析完成")
                                st.markdown("**回答**")
                                st.write(out.get("answer") or "(无回复)")
                        finally:
                            Path(tmp_path).unlink(missing_ok=True)
                        # Agent 模式不写 processing_results / 不展示管道表格
                    else:
                        # 原管道处理
                        result = processor.process_file(
                            file_bytes=file_bytes,
                            filename=uploaded_file.name
                        )
                        
                        file_key = f"{uploaded_file.name}_{uploaded_file.size}"
                        st.session_state.processing_results[file_key] = result
                        
                        if result.success:
                            st.success(f"✅ 成功处理！找到 {result.out_of_stock_count} 个无货产品")

                            debug_sheets = getattr(result, "debug_per_sheet", None)
                            if debug_sheets:
                                with st.expander("🔍 调试信息（每 Sheet 数据段与 LLM 结果）"):
                                    for d in debug_sheets:
                                        err = f" — {d['error']}" if d.get("error") else ""
                                        st.text(
                                            f"Sheet「{d['sheet']}」: 全表 {d['total_rows']} 行 → 送 LLM {d['data_section_rows']} 行 | "
                                            f"内容含「无货」: {'是' if d.get('has_wu_huo') else '否'} | LLM 提取: {d.get('llm_count', 0)} 条{err}"
                                        )
                                    if result.out_of_stock_count == 0 and debug_sheets:
                                        st.caption(
                                            "若「内容含无货: 否」说明数据段可能被截得过早，可调大 MAX_TABLE_ROWS_FOR_LLM 或检查表尾关键词；"
                                            "若「是」但 LLM 提取 0 条，多为模型未识别，可尝试调整 prompt 或换模型。"
                                        )
                            
                            if result.records:
                                with st.container():
                                    st.subheader("📋 提取结果")
                                    df = pd.DataFrame([{
                                        "产品名称": r.product_name,
                                        "规格型号": r.specification or "",
                                        "单位": r.unit,
                                        "数量": r.quantity
                                    } for r in result.records])
                                    st.dataframe(
                                        df,
                                        width="stretch",
                                        height=400
                                    )
                            
                            if result.email_triggered:
                                st.warning("⚠️ 已触发邮件通知（缺货次数 ≥ 2）")
                        else:
                            st.warning(f"⚠️ 处理完成，但未找到无货产品" if not result.error else f"❌ {result.error}")
                        
                except Exception as e:
                    st.error(f"❌ 处理失败：{str(e)}")
                    logger.exception("处理文件异常")

# 按文件查看页面
elif page == "按文件查看":
    st.subheader("📂 按文件查看无货记录")

    try:
        # 获取所有文件
        files = processor.data_service.get_files_summary()

        if files:
            st.markdown(f"**共找到 {len(files)} 个文件**")

            # 显示文件列表
            for idx, file_info in enumerate(files):
                with st.expander(
                    f"📄 {file_info['file_name']} "
                    f"（{file_info['total_records']} 条记录，"
                    f"上传时间：{file_info['uploaded_at'][:19] if file_info['uploaded_at'] else '未知'}）"
                ):
                    # 查询该文件的记录
                    records = processor.data_service.get_records_by_file(
                        file_name=file_info['file_name'],
                        batch_id=file_info['upload_batch_id']
                    )

                    if records:
                        df = pd.DataFrame(records)

                        # 显示摘要信息
                        col1, col2, col3 = st.columns(3)
                        with col1:
                            st.metric("无货产品数", len(df))
                        with col2:
                            high_count = len(df[df['count'] >= 2])
                            st.metric("高频无货（≥2次）", high_count)
                        with col3:
                            email_sent = len(df[df['email_status'] == 'sent'])
                            st.metric("已发邮件", email_sent)

                        # 显示详细列表
                        st.dataframe(
                            df[['product_name', 'specification', 'unit', 'quantity', 'count', 'email_status']],
                            width="stretch",
                            column_config={
                                "product_name": "产品名称",
                                "specification": "规格型号",
                                "unit": "单位",
                                "quantity": "数量",
                                "count": "无货次数",
                                "email_status": "邮件状态"
                            }
                        )
                    else:
                        st.info("该文件无有效记录")
        else:
            st.info("暂无上传文件")
    except Exception as e:
        st.error(f"查询失败：{str(e)}")

# 无货产品列表页面
elif page == "无货产品列表":
    st.subheader("📋 无货产品列表")

    # 查询数据
    try:
        records = processor.data_service.get_all_records(limit=1000)

        if records:
            df = pd.DataFrame(records)

            # 添加操作列（复选框）
            st.markdown("**选择要删除的记录：**")

            # 使用 session_state 存储选中的记录
            if "selected_records" not in st.session_state:
                st.session_state.selected_records = []

            # 操作按钮
            col1, col2, col3 = st.columns([1, 1, 4])
            with col1:
                if st.button("🗑️ 删除选中", type="primary"):
                    if st.session_state.selected_records:
                        # 确认对话框
                        if "delete_confirmed" not in st.session_state:
                            st.session_state.delete_confirmed = False

                        if not st.session_state.delete_confirmed:
                            st.warning(f"确定要删除 {len(st.session_state.selected_records)} 条记录吗？")
                            col_yes, col_no = st.columns(2)
                            with col_yes:
                                if st.button("✅ 确认删除"):
                                    deleted_count = processor.data_service.batch_delete_records(
                                        st.session_state.selected_records
                                    )
                                    st.success(f"✅ 已删除 {deleted_count} 条记录")
                                    st.session_state.selected_records = []
                                    st.session_state.delete_confirmed = False
                                    st.rerun()
                            with col_no:
                                if st.button("❌ 取消"):
                                    st.session_state.delete_confirmed = False
                                    st.rerun()
                    else:
                        st.warning("⚠️ 请先选择要删除的记录")

            with col2:
                if st.button("🔄 刷新列表"):
                    st.session_state.selected_records = []
                    st.rerun()

            # 显示数据表格（带选择列）
            # 添加复选框列
            df_display = df.copy()

            # 使用 data_editor 支持选择
            edited_df = st.data_editor(
                df_display,
                width="stretch",
                height=500,
                disabled=list(df_display.columns),  # 禁用编辑
                hide_index=False,
                column_config={
                    "id": st.column_config.NumberColumn("ID", width="small"),
                    "product_name": st.column_config.TextColumn("产品名称", width="medium"),
                    "specification": st.column_config.TextColumn("规格型号", width="medium"),
                    "count": st.column_config.NumberColumn("无货次数", width="small"),
                    "email_status": st.column_config.TextColumn("邮件状态", width="small"),
                    "email_sent_by": st.column_config.TextColumn("发送人", width="small"),
                }
            )

            # 多选删除功能（简化版）
            st.markdown("---")
            st.markdown("**快速删除：输入要删除的记录 ID（用逗号分隔）**")
            delete_ids_input = st.text_input("例如：1,3,5", key="delete_ids_input")
            if st.button("🗑️ 批量删除"):
                if delete_ids_input:
                    try:
                        ids = [int(x.strip()) for x in delete_ids_input.split(",")]
                        deleted_count = processor.data_service.batch_delete_records(ids)
                        st.success(f"✅ 已删除 {deleted_count} 条记录")
                        st.rerun()
                    except ValueError:
                        st.error("❌ 请输入有效的 ID（数字，用逗号分隔）")
        else:
            st.info("暂无数据")
    except Exception as e:
        st.error(f"查询失败：{str(e)}")

# 统计信息页面
elif page == "统计信息":
    st.subheader("📊 统计信息")
    
    try:
        stats = processor.data_service.get_statistics()
        
        # 关键指标
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("总记录数", stats["total_records"])
        with col2:
            st.metric("无货产品数", stats["out_of_stock_count"])
        with col3:
            st.metric("触发通知数", stats["notified_count"])
        with col4:
            st.metric("今日新增", stats["today_count"])
    except Exception as e:
        st.error(f"获取统计信息失败：{str(e)}")
