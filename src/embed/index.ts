/**
 * BrushGame - 刷牙游戏嵌入式引擎
 *
 * 用法：
 * ```html
 * <script src="brushing-engine.umd.js"></script>
 * <script>
 *   const handle = await BrushGame.start({
 *     canvas: document.getElementById('game-canvas'),
 *     avatarId: 'owl',
 *     gameDurationMs: 120000,
 *     onScore: (stats, points) => console.log('Score!', points),
 *     onGameOver: (stats) => console.log('Game Over', stats)
 *   });
 * </script>
 * ```
 */

export { start, config } from './runtime';
export type {
  StartOptions,
  StopHandle,
  GameState,
  GameStats,
  GameEvent,
  AvatarConfig
} from './runtime';
