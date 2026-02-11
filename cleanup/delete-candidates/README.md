This folder contains asset source files that are not referenced by runtime code.

Moved here for centralized cleanup:
- `1.27-jojo刷牙游戏界面切图和gif帧/`
- `png/`

Verification basis:
- No references found in `src/`, `prototype/`, or `public/` to these folder paths.
- Runtime assets still used by the app remain under `prototype/` and were not moved.

Safe cleanup:
- If you do not need these source files, you can delete this whole folder directly.
