# Documentation Index

更新：2026-06-23。本文说明哪些文档可作为当前事实入口，哪些只是历史参考。

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
- `../prototype/docs/*.sql`：Memfire/Supabase schema 和迁移脚本参考。
- `../public/models/README.md`、`../prototype/lib/models/README.md`：模型下载说明；当前更推荐先看 `../scripts/fetch-models.mjs`。
- `../cleanup/delete-candidates/README.md`：未引用设计源文件的清理说明。

## 更新规则
- 产品范围、用户故事、验收或测试 seam 变化：先更新 `product/PRD.md`。
- 当前工程事实变化：更新 `AI_REFERENCE.md`，再判断是否需要同步短根文档。
- 根入口变化要同步 `../AGENTS.md` 与 `../CLAUDE.md`，并用 `cmp -s AGENTS.md CLAUDE.md` 复核。
- 长篇历史或废弃说明要进 `md/archive/<date>-<topic>/`，不要塞回根文档。
- 如果文档和代码冲突，先以代码/命令/浏览器验证为准，并修正文档或标注缺口。
