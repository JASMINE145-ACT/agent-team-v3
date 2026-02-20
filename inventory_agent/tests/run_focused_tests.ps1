# 只跑之前有问题的 8 个用例（可按需修改列表）
python -m pytest `
  src/inventory_agent/tests/test_integration_prd.py::TestPRDAssertions::test_prd_keywords_match_tee_with_cover_dn40 `
  src/inventory_agent/tests/test_integration_prd.py::TestPRDAssertions::test_prd_end_to_end_query_dn32 `
  src/inventory_agent/tests/test_e2e.py::TestEndToEnd::test_e2e_keywords_query_tee_with_cover_dn40 `
  src/inventory_agent/tests/test_e2e.py::TestEndToEnd::test_e2e_c12_dn32_query `
  src/inventory_agent/tests/test_e2e.py::TestEndToEnd::test_e2e_multiple_results_tee_with_cover `
  src/inventory_agent/tests/test_e2e.py::TestEndToEnd::test_e2e_response_time_performance `
  src/inventory_agent/tests/test_e2e.py::TestEndToEndScenarios::test_scenario_1_sales_person_quick_query `
  src/inventory_agent/tests/test_e2e.py::TestEndToEndScenarios::test_scenario_3_multiple_candidates `
  -v --tb=short
