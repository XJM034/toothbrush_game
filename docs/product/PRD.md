# Brushing Master Web PRD

更新：2026-06-23。本文是当前 Web 原型的产品需求入口，合并旧设计文档、原型说明和当前实现事实后生成。历史文档只作追溯，不再作为当前产品口径。

## Problem Statement

一年前练手形成的刷牙游戏项目已经能跑出移动端 Web 原型和 MediaPipe 刷牙识别闭环，但项目目录和管理文档长期叠加：原始产品 prompt、早期 Web MVP 设计、2.0 设计、iOS 迁移设计、旧 React 实施文档和当前 agent 指南互相重叠，部分内容还保留旧路径、旧参数和已删除的 React Hooks/Components 叙事。用户需要一个不影响现有功能的整理版本，让后续自己或 AI agent 可以快速判断什么是当前产品事实、什么只是历史参考、下一步应该围绕哪些体验和工程边界推进。

## Solution

将 Brushing Master Web 明确为“移动端刷牙习惯养成 Web 原型”：儿童在手机浏览器中登录，选择档案、刷牙时长和头套皮肤，点击开始后通过摄像头完成一局刷牙挑战；系统用 MediaPipe 检测露牙、握拳和晃动，将刷牙动作映射为消灭菌斑的游戏反馈；结束后展示金币奖励、保存刷牙会话，并允许进入照片贴纸装饰流程。文档结构收敛为当前 PRD、工程事实参考、文档索引和 agent 指南；旧设计和实施文档移入日期归档，保留历史但退出活跃管理面。

## User Stories

1. As a child brusher, I want the app to feel like a cute game, so that brushing teeth feels playful instead of like a chore
2. As a child brusher, I want to tap a clear start button, so that I know exactly when a brushing challenge begins
3. As a child brusher, I want to see myself with a fun head accessory, so that the camera experience feels rewarding
4. As a child brusher, I want the head accessory to follow my face, so that the game feels alive while I brush
5. As a child brusher, I want simple prompts for showing teeth and brushing, so that I can follow the game without reading complex instructions
6. As a child brusher, I want gentle recognition rules, so that small hands and imperfect brushing motions can still make progress
7. As a child brusher, I want visible germs or plaque to disappear while I brush, so that I understand my action is helping
8. As a child brusher, I want a short success celebration after brushing actions, so that I feel encouraged to continue
9. As a child brusher, I want a choice of 1, 2, or 3 minute sessions, so that the challenge can match my age and patience
10. As a child brusher, I want the game to finish even if photos cannot be stored, so that storage problems do not ruin the session
11. As a child brusher, I want to receive coins after a session, so that I feel rewarded for completing brushing
12. As a child brusher, I want to unlock or buy decorative skins, so that I have a reason to return
13. As a child brusher, I want skins to be purely cosmetic, so that the game stays fair and simple
14. As a child brusher, I want to decorate captured photos with stickers, so that the session produces something fun to save or share locally
15. As a parent, I want brushing photos to stay local, so that children’s images are not uploaded by default
16. As a parent, I want profile support, so that multiple children can use the same device without mixing progress
17. As a parent, I want settings for brushing duration, so that I can tune sessions to a child’s age or routine
18. As a parent, I want reminders to exist as a product concept, so that brushing can become a habit outside the game session
19. As a parent, I want the app to explain camera usage through the flow, so that granting permission feels understandable
20. As a parent, I want session history and rewards to save when backend storage is available, so that progress survives reloads
21. As a parent, I want local fallback behavior when backend storage fails, so that the child can keep playing
22. As a developer, I want a single current PRD, so that I do not have to reconcile multiple stale design files before making a change
23. As a developer, I want old documents archived instead of mixed into current docs, so that history remains available without misleading implementation work
24. As a developer, I want current architecture boundaries documented, so that prototype pages and recognition engine changes stay separate
25. As a developer, I want clear storage boundaries, so that photo privacy and backend writes do not drift accidentally
26. As a developer, I want command and validation guidance in one place, so that changes can be checked consistently
27. As a developer, I want generated build artifacts and source responsibilities distinguished, so that I do not edit stale outputs as the source of truth
28. As a developer, I want model and WASM preparation documented, so that local and deployment builds can recover missing assets
29. As a developer, I want old XP and achievement fields explained as legacy or backend-level concepts, so that UI wording does not regress back to stale score semantics
30. As a future iOS developer, I want iOS migration material archived and labeled as reference, so that it can inform native work without pretending the current repo is an iOS app
31. As an AI agent, I want root instructions to point to current docs, so that I can avoid loading thousands of stale lines for routine tasks
32. As an AI agent, I want active queue rules, so that todo cleanup does not depend on chat memory
33. As an AI agent, I want browser QA and build seams named explicitly, so that I can verify behavior at the same level users experience it
34. As a maintainer, I want a clean top-level project map, so that returning to the repo after a long gap feels manageable

## Implementation Decisions

- Keep the runtime architecture as a Web prototype plus a TypeScript recognition engine. The page layer owns user flows and visual presentation; the engine layer owns camera startup, MediaPipe initialization, gesture detection, head accessory rendering, capture scheduling, and session stats.
- Keep the prototype as independent mobile HTML pages rather than rewriting it into a React app. React remains present in dependencies for existing Vite configuration, but current product flow should be described as prototype HTML plus embed runtime.
- Keep camera startup behind an explicit user gesture. This is both a mobile-browser permission requirement and a product clarity requirement.
- Treat “show teeth once” as a session-level gate for the current child-friendly mode. After the gate is confirmed, gentle fist and slower shake motion can score repeatedly.
- Treat score as an internal gameplay statistic. The current user-facing reward concept is coins; legacy XP and achievements can remain in schema or historical docs but should not drive current UI language unless the product boundary changes.
- Keep captured photos local. A future backend-photo feature requires a separate privacy, quota, deletion, permission, and audit design.
- Keep photo persistence resilient. The game should try to save the configured capture set, degrade to fewer photos when storage quota is tight, and continue to the result page even when no photo can be stored.
- Keep the highest product validation seam at the HTTPS prototype flow: login or test session setup, home, ready, gameplay, result, collection, settings, and photo edit. Lower-level detector or build checks support that seam but do not replace it.
- Keep historical documents in date-stamped archive folders. Current work should start from the PRD, documentation index, engineering reference, and agent guide.
- Do not restructure runtime assets or generated embed outputs during documentation cleanup. Any future physical directory move inside runtime folders must be paired with browser verification of all referenced assets.
- Use GitHub issues as the external PRD publication target when issue-tracker access is available. The requested triage label is `ready-for-agent`.

## Testing Decisions

- Good tests should validate external behavior and product contracts, not internal implementation details. For this project, the strongest seam is the running HTTPS prototype, because camera permission, auth guard, storage handoff, and static asset loading are user-visible.
- Documentation-only cleanup should be verified by checking that current docs route to the new PRD and archive, that agent root docs remain mirrored, and that no active doc points at deleted historical locations.
- Runtime safety after documentation cleanup should be checked with a full build when dependencies are available. This catches accidental TypeScript, Vite, asset-preparation, and prototype-copy regressions.
- Prototype page changes should be checked through the local HTTPS service and browser automation or manual QA. Static grep is not enough for camera, safe-area, capture, result, collection, or photo-edit flows.
- Engine, detector, model path, or build-config changes should be checked with the embed build before browser QA.
- Storage behavior should be tested from the outside: session result data reaches the result page, photo capture data reaches the photo edit page when available, and failures do not block navigation.
- Auth/session behavior should be tested through real login where possible. LocalStorage bypass is acceptable only as a clearly labeled debug state.
- There is currently no committed Playwright test suite or CI. Until such seams exist, build commands plus browser QA are the practical guardrails.

## Out of Scope

- Rewriting the prototype UI or recognition engine.
- Moving runtime assets, model files, generated embed bundles, HTML pages, or source modules.
- Adding backend photo upload.
- Redesigning Memfire/Supabase RLS policies.
- Implementing reminders, cooldown enforcement, or native iOS behavior beyond documenting their product status.
- Fixing npm audit findings or changing the package manager.
- Creating a full automated test suite.

## Further Notes

- This PRD intentionally consolidates older product and design ideas into a current Web-prototype scope. Archived documents can still be useful for visual inspiration, iOS migration, or algorithm background, but they must be checked against code before becoming current requirements.
- Published externally as GitHub issue #18: https://github.com/XJM034/toothbrush_game/issues/18 with label `ready-for-agent`.
- Local documentation remains the durable source inside the repo. If issue publication later drifts or tracker access is unavailable, this file remains the PRD source of truth.
- Future product changes should update this PRD first, then update engineering references and agent instructions only when implementation facts or validation routes change.
