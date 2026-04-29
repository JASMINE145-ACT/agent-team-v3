"""Unit tests for _apply_candidate_pre_filter — one test per scoring rule."""

from backend.tools.inventory.services.llm_selector import _apply_candidate_pre_filter


def _c(name: str, source: str = "字段匹配", price: float = 100.0) -> dict:
    return {"code": "8000000001", "matched_name": name, "unit_price": price, "source": source}


def test_default_drainage_demotes_aw_when_no_water_supply_signal():
    candidates = [
        _c("90°弯头印尼(日标)PVC-U管件(AW给水系列)灰色 DN50 联塑", source="共同"),
        _c("90°弯头PVC-U排水配件白色 dn50"),
    ]
    result = _apply_candidate_pre_filter("50弯头", candidates)
    assert "排水配件" in result[0]["matched_name"]


def test_default_drainage_keeps_aw_when_water_supply_signal():
    candidates = [
        _c("90°弯头印尼(日标)PVC-U管件(AW给水系列)灰色 DN50 联塑", source="共同"),
        _c("90°弯头PVC-U排水配件白色 dn50"),
    ]
    result = _apply_candidate_pre_filter("50给水弯头", candidates)
    assert "AW给水系列" in result[0]["matched_name"]


def test_jis_priority_promotes_japanese_standard():
    candidates = [
        _c("90°顺水三通PVC-U排水配件白色 dn110", source="共同"),
        _c("短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN100 联塑"),
    ]
    result = _apply_candidate_pre_filter("110三通", candidates)
    assert "印尼(日标)" in result[0]["matched_name"]


def test_jis_priority_skipped_when_guobiao_signal():
    candidates = [
        _c("90°顺水三通PVC-U排水配件白色 dn110", source="共同"),
        _c("短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN100"),
    ]
    result = _apply_candidate_pre_filter("国标110三通", candidates)
    assert "dn110" in result[0]["matched_name"].lower()

 
def test_guobiao_signal_penalizes_jis_even_with_better_source():
    candidates = [
        _c("国标PVC-U给水管 DN50", source="字段匹配"),
        _c("印尼(日标)PVC-U给水管 DN50", source="共同"),
    ]
    result = _apply_candidate_pre_filter("国标dn50管", candidates)
    assert "国标" in result[0]["matched_name"]


def test_hot_water_promotes_hot_supply():
    candidates = [
        _c("冷给水直管印尼(日标) DN25 联塑", source="历史报价"),
        _c("热给水直管印尼(日标) DN25 联塑"),
    ]
    result = _apply_candidate_pre_filter("PPR热水管DN25", candidates)
    assert "热给水" in result[0]["matched_name"]


def test_cold_water_demotes_hot_supply():
    candidates = [
        _c("热给水直管印尼(日标) DN25 联塑", source="历史报价"),
        _c("冷给水直管印尼(日标) DN25 联塑"),
    ]
    result = _apply_candidate_pre_filter("冷水管DN25", candidates)
    assert "冷给水" in result[0]["matched_name"]


def test_default_pressure_promotes_1mpa():
    candidates = [
        _c("PVC-U给水管 DN50 1.25MPa"),
        _c("PVC-U给水管 DN50 1.0MPa"),
    ]
    result = _apply_candidate_pre_filter("DN50给水管", candidates)
    assert "1.0mpa" in result[0]["matched_name"].lower()


def test_explicit_pressure_overrides_source_priority():
    candidates = [
        _c("PVC-U给水管 DN50 1.25MPa", source="字段匹配"),
        _c("PVC-U给水管 DN50 1.0MPa", source="共同"),
    ]
    result = _apply_candidate_pre_filter("DN50给水管 1.25MPa", candidates)
    assert "1.25mpa" in result[0]["matched_name"].lower()


def test_liansu_brand_tiebreak():
    candidates = [
        _c("90°弯头PVC-U排水配件白色 dn50 其他品牌"),
        _c("90°弯头PVC-U排水配件白色 dn50 联塑"),
    ]
    result = _apply_candidate_pre_filter("50弯头排水", candidates)
    assert "联塑" in result[0]["matched_name"]


def test_source_priority_ranking():
    candidates = [
        _c("PVC-U 排水弯头 dn50", source="字段匹配"),
        _c("PVC-U 排水弯头 dn50 联塑", source="历史报价"),
        _c("PVC-U 排水弯头 dn50", source="共同"),
    ]
    result = _apply_candidate_pre_filter("50排水弯头", candidates)
    assert result[0]["source"] == "共同"
    assert result[1]["source"] == "历史报价"


def test_pre_score_key_attached_to_all_candidates():
    candidates = [_c("product A"), _c("product B")]
    result = _apply_candidate_pre_filter("keyword", candidates)
    assert all("_pre_score" in c for c in result)


def test_empty_candidates_returns_empty():
    assert _apply_candidate_pre_filter("keyword", []) == []
