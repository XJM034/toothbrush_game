# Documentation Index

更新：2026-07-17。本文说明哪些文档可作为当前事实入口，哪些只是历史参考。

## 当前入口
- `../README.md`：面向人类维护者的项目入口、运行命令和目录概览。
- `../AGENTS.md`、`../CLAUDE.md`：短根文档，给 AI agent 的高频规则和操作地图；两者必须保持镜像。
- `product/PRD.md`：当前 Web 原型的产品需求与测试 seam。
- `AI_REFERENCE.md`：当前实现事实、验证地图、文件路由、已知缺口。
- `PROJECT_STRUCTURE.md`：目录边界、运行资源、归档区和安全整理流程。
- `../.context/todos.md`：当前为空；未来如作为 active queue，生命周期规则见 `AI_REFERENCE.md`。

## 历史实现参考
- `md/archive/2026-06-23-doc-consolidation/`：旧产品 prompt、早期设计、2.0 设计、旧实施文档、iOS 迁移文档；仅作历史参考。
- `md/archive/2026-06-17-root-agent-docs/`：本次文档瘦身前的根 agent 文档原文快照；文件名已改为 `root-*-legacy.md`，避免被识别为 scoped agent 指令。
- `assets/legacy-prototype/`：从 `prototype/` 移出的早期 UI 参考截图与样例图；不参与当前运行。
- `../handoff/`：当前不存在；如果后续创建 handoff，作为延续上下文，不替代代码与命令验证。

## Schema 与运行资源
- `../supabase/README.md`：Supabase 新项目迁移 runbook。
- `../supabase/migrations/20260708180000_auth_owned_initial_schema.sql`：正式 Supabase 初始化迁移文件，与 prototype schema 参考保持一致。
- `../supabase/migrations/20260709011000_harden_schema_advisors.sql`：Supabase advisor hardening 迁移文件。
- `../supabase/migrations/20260709012132_restrict_catalog_write_grants.sql`：目录表只读权限收紧迁移。
- `../supabase/migrations/20260717012328_add_keepalive_probe.sql`：Free project 只读保活 RPC 迁移。
- `../supabase/seed_test_auth_users.sql`：原型测试账号 seed，不属于正式迁移。
- `../prototype/docs/supabase_initial_schema.sql`：当前 Supabase Auth 版初始 schema 和 Data API/RLS grant 脚本。
- `../prototype/docs/supabase_auth_users.example.json`：测试 Auth 用户导入示例，配合 `../scripts/seed-supabase-auth-users.mjs` 使用。
- `../scripts/write-supabase-local-config.mjs`：用环境变量生成本地 `prototype/supabase_config.local.js`。
- `../prototype/docs/memfire_*.sql`：旧 Memfire schema 或操作片段，仅作历史参考。
- `../public/models/README.md`、`../prototype/lib/models/README.md`：模型下载说明；当前更推荐先看 `../scripts/fetch-models.mjs`。
- `../cleanup/delete-candidates/README.md`：未引用设计源文件的清理说明。

## QA 与回归记录
- `qa/2026-07-09-supabase-migration-e2e.md`：Supabase 迁移后的 Chrome E2E 回归记录，包含已确认破坏点和未完全验证项。

## 更新规则
- 产品范围、用户故事、验收或测试 seam 变化：先更新 `product/PRD.md`。
- 当前工程事实变化：更新 `AI_REFERENCE.md`，再判断是否需要同步短根文档。
- 根入口变化要同步 `../AGENTS.md` 与 `../CLAUDE.md`，并用 `cmp -s AGENTS.md CLAUDE.md` 复核。
- 长篇历史或废弃说明要进 `md/archive/<date>-<topic>/`，不要塞回根文档。
- 如果文档和代码冲突，先以代码/命令/浏览器验证为准，并修正文档或标注缺口。
