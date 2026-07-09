# Project Structure

更新：2026-07-09。本文是目录整理边界，不替代 `docs/AI_REFERENCE.md` 的实现事实。

## Runtime-Stable Paths

这些路径参与当前运行。不要为了“看起来整齐”直接移动；移动前必须先更新所有引用，并跑构建和浏览器/HTTPS 预览验证。

- `prototype/*.html`：移动端页面流。
- `prototype/auth_guard.js`、`prototype/mobile_fixes.js`、`prototype/shared_styles.css`、`prototype/supabase_config.js`、`prototype/supabase_client.js`：原型共享脚本、当前 Supabase 配置和样式。
- `prototype/Avatar_ima/`：主页和设置页的档案头像图片。
- `prototype/SkinSet/`：收藏、准备页、游戏头套和 SQL seed 引用的皮肤资源。
- `prototype/game-assets/`：游戏页视觉素材。
- `prototype/lib/embed/`：embed 构建输出和本地 MediaPipe WASM/model 运行资源。
- `prototype/docs/supabase_initial_schema.sql`、`prototype/docs/supabase_auth_users.example.json`：当前 Supabase Auth 版 schema、RLS 与测试用户导入参考。
- `supabase/`：当前 Supabase 迁移 runbook、初始化迁移文件和原型测试账号 seed。
- `prototype/docs/memfire_*.sql`：旧 Memfire schema 参考，不参与当前运行。
- `public/models/`、`public/mediapipe/`：Vite 运行与模型/WASM 资源。
- `src/`：识别、检测器、游戏状态、渲染和 embed runtime 源码。
- `scripts/`：模型/WASM 准备脚本、Supabase 本地配置生成脚本，以及 Supabase Auth 测试用户导入脚本。

## Current Documentation Paths

- `README.md`：人类维护入口。
- `AGENTS.md` / `CLAUDE.md`：AI agent 高频规则，必须保持镜像。
- `docs/README.md`：文档索引。
- `docs/product/PRD.md`：当前产品需求入口。
- `docs/AI_REFERENCE.md`：当前工程事实和验证地图。
- `docs/PROJECT_STRUCTURE.md`：目录边界和整理规则。
- `supabase/README.md`、`supabase/migrations/`、`supabase/seed_test_auth_users.sql`：数据库迁移 runbook、迁移文件和原型测试账号 seed，不是历史归档。
- `vercel.json`、`.vercelignore`：Vercel preview 部署命令和上传排除规则。
- `docs/md/archive/`：历史长文档归档，不作为当前事实。
- `docs/assets/legacy-prototype/`：从 `prototype/` 移出的非运行参考图/样例图。

## Local Or Generated Paths

- `node_modules/`：本机依赖，已被 `.gitignore` 忽略。
- `dist/`：`npm run build` 输出，已被 `.gitignore` 忽略；构建复制 prototype 时会排除本地数据库覆盖文件。
- `prototype/.env.memfire.local`、`prototype/supabase_config.local.js`：本地数据库配置覆盖，已被忽略，不能作为可提交事实来源。`supabase_config.local.js` 可由 `npm run configure:supabase-local` 生成。
- `.context/todos.md`：当前可作为 active queue；空文件或无事项时无需整理。

## Cleanup Candidates

- `cleanup/delete-candidates/`：未被运行时代码引用的设计源文件候选。删除前应先确认不再需要历史设计源文件。

## Safe Cleanup Process

1. 先用 `rg` 确认候选路径是否被 `prototype/`、`src/`、`scripts/`、`public/` 或入口文档引用。
2. 对确认非运行的历史资料，优先移到 `docs/md/archive/<date>-<topic>/` 或 `docs/assets/<topic>/`。
3. 更新 `README.md`、`docs/README.md`、`docs/AI_REFERENCE.md`，必要时同步 `AGENTS.md` / `CLAUDE.md`。
4. 至少跑 `npm run build`；若涉及 embed、模型、检测器或 Vite 输出，再跑 `npm run build:embed`。
5. 若涉及 `prototype/` 页面、资源路径、相机或结果流，启动 `npm run serve:prototype` 并检查 HTTPS 页面。
