# Supabase 迁移 E2E 回归记录 - 2026-07-09

## 范围

- 目标站点：`https://brushing-master-web.vercel.app`
- 测试浏览器：Chrome
- 账号：项目测试账号。真实测试凭据不写入本报告或 git。
- 重点：确认从 Memfire 迁移到 Supabase 后，认证、用户档案、收藏目录、游戏入口、结果页保存、退出登录和本地配置暴露面是否被破坏。
- 限制：未点击相机授权按钮，真实摄像头权限、MediaPipe 识别、完整刷牙完成和真机性能仍需人工设备 QA。

## 总结

- 初测确定破坏：1 个，已在本轮修复并通过本地浏览器复测。
- 疑似或未完全验证：2 个。
- 通过：认证、未登录守卫、退出登录、测试账号真实登录、设置页读取、创建档案、收藏目录读取、金币不足购买拦截、准备页、游戏入口、照片空状态、本地 Memfire 覆盖文件未公开。

## 修复复测

- 修复方式：删除 `prototype/game_result.html` 中对 `brushing_sessions.diamonds_earned` 的写入；本局金币仍通过 `user_profiles.diamonds` 更新。
- 本地验证：`npm run build` 通过；`npm run serve:prototype` 启动本地 HTTPS 原型后，Chrome 登录测试账号并打开 `prototype/game_result.html`。
- 复测结果：console 出现“刷牙会话保存成功”和“用户档案更新成功”；未再出现 `diamonds_earned`、`schema cache` 或“保存数据到后端失败”相关错误。

## 初测确定破坏

### RESULT-SAVE：结果页会话保存失败

结果页 UI 可以渲染金币、击败细菌、连续天数和按钮，但保存到 Supabase 时失败。

Chrome console 复现到的错误：

```text
错误详情: Could not find the 'diamonds_earned' column of 'brushing_sessions' in the schema cache [object]
```

初测代码证据：

- `prototype/game_result.html:204` 向 `brushing_sessions` 插入记录。
- `prototype/game_result.html:209` 写入了 `diamonds_earned: coins.total`。
- `supabase/migrations/20260708180000_auth_owned_initial_schema.sql:72` 创建的 `public.brushing_sessions` 表没有 `diamonds_earned` 字段。

影响：

- 本次刷牙会话不会写入 Supabase。
- `saveGameDataToBackend()` 在 `saveBrushingSession()` 抛错后进入 catch，后续 `updateUserProfileInDB()` 不会执行。
- 用户看到结果页，但金币/统计只能降级到 localStorage，不会可靠进入当前 Supabase 项目。

建议下一步：

- 如果会话表仍需要保存本局金币，新增 Supabase migration 给 `brushing_sessions` 增加金币字段，并同步 `prototype/docs/supabase_initial_schema.sql`。
- 如果会话表不再保存本局金币，删除 `prototype/game_result.html` 里的 `diamonds_earned` 写入，并确认金币只更新到 `user_profiles.diamonds`。
- 修复后重新跑结果页保存，确认 console 不再出现 schema cache column error。

## 疑似或未完全验证

### GAME-CAMERA：只验证到相机授权边界

从主页点击“开始刷牙！”后进入准备页，再点击“开始”进入 `prototype/game_play.html`。页面显示“点击开始并授权摄像头”，两个 canvas 存在，流程到达用户手势后的摄像头授权边界。

未点击授权按钮，因此以下内容未在本轮声明通过：

- 浏览器摄像头权限弹窗。
- MediaPipe 模型加载和检测结果。
- 完整刷牙计时完成。
- 抓拍照片生成与保存。

### CONFIG-STATIC：直接读取线上 `supabase_config.js` 受工具限制

Chrome 直接打开 `prototype/supabase_config.js` 被客户端拦截，Node HTTPS 请求在当前工具环境出现 DNS 失败。未把这个记为功能破坏，因为：

- 真实登录、设置页读取、创建档案、收藏目录读取都能在生产站通过，说明运行路径已使用 Supabase。
- 本地源码 `prototype/supabase_config.js` 指向当前 Supabase project `bwfpcgdopalydkxydntv.supabase.co`，且只使用 publishable key。
- Chrome 直接访问常见本地覆盖/备份路径均返回 `404: NOT_FOUND`，未看到 Memfire 内容：
  - `/prototype/supabase_config.local.js`
  - `/prototype/.env.memfire.local`
  - `/.env.memfire.local`

## 通过项

| ID | 结果 | 覆盖点 | 证据 |
| --- | --- | --- | --- |
| AUTH-EXISTING-SESSION | PASS | 已登录状态访问登录页会进入主页 | 打开 `prototype/login.html` 后显示主页内容：“开始刷牙！/收藏夹/设置”。 |
| SETTINGS-LOAD | PASS | 设置页读取用户档案和提醒数据 | `prototype/settings.html` 显示“用户存档”“测试档案”“刷牙提醒”“退出登录”。 |
| SETTINGS-CREATE-PROFILE | PASS | 新建用户档案写入 Supabase | 创建测试档案 `QA迁移022719` 后页面显示“角色创建成功！”。 |
| COLLECTION-LOAD | PASS | 收藏页读取皮肤目录和拥有状态 | `prototype/collection.html` 显示猫头鹰、小猫咪、小狗狗、小兔子，运行资源图片加载完成。 |
| COLLECTION-PURCHASE-GUARD | PASS | 金币不足购买路径 | 点击 10 金币皮肤后显示“当前拥有: 0 金币”和“余额不足”。 |
| READY-LOAD | PASS | 主页到准备页 | 准备页显示“选择你的刷牙训练时长”“1 分钟/2 分钟/3 分钟”“开始”。 |
| GAME-ENTRY | PASS | 准备页到游戏页 | 游戏页显示“点击开始并授权摄像头”，未自动申请摄像头。 |
| PHOTO-EMPTY | PASS | 无照片时照片装饰页空状态 | 从结果页进入 `photo_edit.html`，显示“未捕捉到图像”和保存/取消按钮。 |
| LOGOUT | PASS | 退出登录 | 设置页确认退出后跳转到 `prototype/login.html`。 |
| AUTH-GUARD | PASS | 未登录访问受保护主页 | 退出后直接访问 `prototype/home.html` 被重定向到登录页。 |
| AUTH-LOGIN | PASS | 测试账号真实登录 | 输入测试账号后进入 `prototype/home.html`，显示“开始刷牙！”。 |
| CONFIG-MEMFIRE-BACKUP-CHROME | PASS | 本地 Memfire 覆盖文件未公开 | Chrome 访问常见本地配置路径均为 `404: NOT_FOUND`。 |

## 后续建议

1. 后续如果重新设计会话表金币分析字段，再新增 Supabase migration，并同步 `prototype/docs/supabase_initial_schema.sql`。
2. 建议补一个最小脚本或浏览器 QA 清单，专门检查 `brushing_sessions` insert payload 与 Supabase migration 列定义一致。
3. 真机或允许摄像头的 Chrome 环境里再跑一次 `GAME-CAMERA`，覆盖权限、识别、计时完成、抓拍和照片装饰流。
