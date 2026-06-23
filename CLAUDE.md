# Brushing Master Web - Agent Guide

更新：2026-06-23。根文档只放高频规则和操作地图；`AGENTS.md` 与 `CLAUDE.md` 必须保持镜像，改一份后用 `cmp -s AGENTS.md CLAUDE.md` 复核。产品需求见 `docs/product/PRD.md`；细节见 `docs/README.md` 与 `docs/AI_REFERENCE.md`。不要沿用旧归档里的 `riga` 路径，工作目录以当前仓库根目录为准。

## 项目契约
- 这是移动端刷牙游戏 Web 原型：`prototype/*.html` 负责 Kawaii UI 和页面流，`src/embed` 提供无 React 依赖的 MediaPipe 刷牙识别引擎。
- 游戏页必须在用户手势后再申请摄像头；移动端相机调试优先用 HTTPS 本地服务。
- 局内照片只保存到 `sessionStorage` / 本地导出，不写后端。
- 当前产品展示已弱化积分，结果页主要展示金币；底层 `GameStateMachine.score` 和旧 SQL/文档里的 XP/成就字段不能直接等同于当前 UI。
- 未来如果代码、文档、聊天记忆冲突，以当前代码和可运行验证为准；不确定时问一个聚焦问题。

## 首读文件
- `README.md`：人类维护入口、运行命令和目录概览。
- `docs/README.md`：文档索引，区分当前入口和历史参考。
- `docs/product/PRD.md`：当前 Web 原型产品需求、用户故事、实现决策、测试 seam。
- `docs/PROJECT_STRUCTURE.md`：目录边界、运行资源、归档区和安全整理流程。
- `docs/AI_REFERENCE.md`：当前事实、文件地图、验证地图、已知缺口。
- `package.json`、`vite.config.ts`、`vite.prototype.config.ts`：命令和构建输出。
- `prototype/game_play.html`、`src/embed/runtime.ts`：游戏页与嵌入引擎入口。
- `prototype/supabase_client.js`、`prototype/docs/memfire_v2_complete.sql`：数据访问与 schema 参考。
- 若继续前序工作，先读最新 `./handoff/*-handoff.md`（如果存在；当前仓库可没有该目录）。handoff 只作补充，关键结论仍要回到代码验证。

## 命令
- 依赖：当前仓库提交的是 `package-lock.json`，默认用 `npm install`。`package.json` 仍声明 pnpm，这是待确认缺口，改包管理器前先确认。
- 原型 HTTPS 预览：`npm run serve:prototype`，默认打开 `https://localhost:5174/prototype/home.html`。
- 嵌入包构建：`npm run build:embed`，输出 `prototype/lib/embed/brushing-engine.{umd,esm}.js`，并触发模型/WASM 准备。
- 完整构建：`npm run build`，执行 `tsc -b`、Vite 构建，并复制 `prototype` 到 `dist/prototype`。
- Lint：`npm run lint` 只是脚本入口；当前未发现 `eslint.config.*`，ESLint v9 会失败，跑通前不能把它当硬护栏。

## 加载地图
- 原型页面：`prototype/login.html` 登录，`auth_guard.js` 保护主页、设置、游戏、结果、收藏、装饰页。
- 认证/session：登录写 `localStorage.brushing_user`；受保护页面要求用户对象至少有 `id` 和 `account`。
- 皮肤资源：运行时优先用 `prototype/SkinSet/*.webp`，兼容同名 png。
- 模型资源：`scripts/fetch-models.mjs` 准备 `public/models`、`public/mediapipe/wasm`、`prototype/lib/embed/*`。
- 移动视口：`prototype/shared_styles.css` 和 `prototype/mobile_fixes.js` 提供 `--app-height`、safe-area、低端设备开关。
- 设计参考/样例图：旧 `prototype/Reference`、`prototype/Sample_ima` 已移到 `docs/assets/legacy-prototype/`，不参与当前运行。
- 可删除候选：`cleanup/delete-candidates/README.md` 说明未引用的设计源文件。

## 当前玩法边界
- `prototype/game_play.html` 点击开始后调用 `BrushGame.start()`，传入 `canvas`、`avatarCanvas`、时长、皮肤、模型路径和抓拍参数。
- 幼儿友好规则在 `src/core/detectors/BrushGesture.ts`、`Fist.ts`：露牙一次后锁定，轻握拳和较慢晃动即可得分，默认 300ms 完成一次。
- 抓拍默认最多 4 张，最大边长 800px（低端设备 640px），保存失败会降级为 3 张或 1 张，流程不能被照片配额阻断。
- `photo_edit.html` 读取实际保存的 `sessionStorage.capturedPhotos`；没有照片时显示空状态，不强制补齐 6 张。

## Agent 可读工具
- `agent-browser open https://localhost:5174/prototype/home.html` 可做可见流程 QA；配合 `agent-browser snapshot -i`、`click`、`fill`。
- 调试绕过登录时可写入 `localStorage.brushing_user = {"id":"test","account":"test"}`，但最终结论要说明这是测试态。
- 需要库/框架/SDK/API/CLI/cloud service 最新用法时用 ctx7：先 `npx --yes ctx7@latest library <name> "<完整问题>"`，再用选中的 `/org/project` 调 `npx --yes ctx7@latest docs <id> "<完整问题>"`。最多 3 条命令，不在查询里放密钥。DNS/fetch/no-output 网络失败时按权限规则用同命令外部沙箱重试；quota 错误提示用户登录或设置 `CONTEXT7_API_KEY`。

## 验证规则
- 改 `src/embed`、检测器、模型路径、Vite 配置后，至少跑 `npm run build:embed`。
- 改全局 TS 或构建配置后，跑 `npm run build`。
- 改 prototype 页面、相机、safe-area、抓拍、结果或装饰流后，启动 `npm run serve:prototype`，用浏览器或 `agent-browser` 检查主路径。
- 相机权限、头套跟随、真机性能、iOS/Android 地址栏压缩属于手动/浏览器 QA；不能只用静态 grep 宣称通过。
- 若依赖未安装导致命令无法运行，先说明失败原因；需要联网安装时按权限流程执行。

## 脚本护栏与缺口
- 已配置脚本入口：TypeScript/Vite 构建、Vite embed 构建、`prepare:assets` 资源准备脚本；是否已在当前机器跑通过要看本次命令输出。
- 当前缺口：没有 CI、测试套件、Playwright 配置、文档链接检查；未发现 ESLint v9 配置，lint 跑通前不能当硬护栏；Memfire SQL 的 RLS 当前为匿名宽松策略，生产化前必须重新审计。

## 文档生命周期
- 根文档只保留稳定规则；实现细节、参数表、过时说明放 `docs/AI_REFERENCE.md` 或专题文档。
- 产品范围、用户故事、验收或测试 seam 变化先更新 `docs/product/PRD.md`。
- 目录归属、运行资源边界或整理流程变化更新 `docs/PROJECT_STRUCTURE.md`，并按需同步入口文档。
- 大段历史内容移动前必须归档到 `docs/md/archive/<date>-<topic>/`。
- `.context/todos.md` 当前为空，可作为 active queue；新增项要写来源、影响范围、下一步、完成证据。证据足够时删除或移入归档；证据冲突时先问用户。
- 重复 bug、评审意见、清理模式应优先落到测试、脚本、检查清单或 `docs/AI_REFERENCE.md`，不要只靠聊天记忆。
- 当前没有 scoped `AGENTS.md`；只有当子树出现独立命令、风险或长期规则时再新增，并从根文档路由过去。

## 何时重跑 `$claude-agents-bootstrap`
- 角色/路由/认证/session/schema/存储/导出/安全边界变化。
- 命令、构建输出、验证流程、文档结构变化。
- 大功能分支完成、准备 handoff、准备 PR/merge，且当前 AI 文档可能不再匹配代码。

## Never
- 不要把旧 `docs/项目实施文档.md` 里的 React Hooks/Components 路径写成当前事实。
- 不要把 `docs/md/archive/2026-06-23-doc-consolidation/` 里的旧设计/实施/iOS 文档当作当前事实。
- 不要把 `docs/assets/legacy-prototype/` 当作运行资源路径；运行资源仍在 `prototype/` 和 `public/`。
- 不要重新引入 `public/embed` 作为当前构建输出。
- 不要把游戏抓拍写入后端，除非用户明确改变产品边界。
- 不要把旧文档里的 800ms、6 张照片、积分展示、`riga` 工作目录当作当前事实。
- 不要在没有验证的情况下宣称真机相机、移动端布局或后端写入正常。

## Compact Instructions
- 保留当前架构：prototype HTML + TS embed runtime + MediaPipe Tasks + Memfire/localStorage。
- 保留修改文件、关键行为变化、命令结果、未跑验证及原因。
- 保留相机/HTTPS/用户手势、照片本地保存、抓拍降级、金币展示、safe-area 适配这些产品边界。
- 若上下文被压缩，下一位 agent 先读本文件、`README.md`、`docs/README.md`、`docs/product/PRD.md`、`docs/PROJECT_STRUCTURE.md`、`docs/AI_REFERENCE.md`、最新 handoff，再用代码和命令复核。
