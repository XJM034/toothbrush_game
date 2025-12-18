// 游戏状态机 - 控制游戏流程
import { BrushGesture, BrushGestureResult } from '../detectors/BrushGesture';
import { DetectionResult } from '../../types';

export type GameState = 'init' | 'ready' | 'playing' | 'brushing' | 'success' | 'gameover';

export interface GameEvent {
  type: string;
  timestamp: number;
  data?: any;
}

export interface GameStats {
  score: number;  // 当前积分
  brushCount: number;  // 刷牙次数
  successCount: number;  // 成功次数
  totalBrushTime: number;  // 总刷牙时间（ms）
  accuracy: number;  // 准确率 (0-1)
}

export class GameStateMachine {
  private currentState: GameState = 'init';
  private brushGesture: BrushGesture;
  private gameStats: GameStats = {
    score: 0,
    brushCount: 0,
    successCount: 0,
    totalBrushTime: 0,
    accuracy: 0
  };

  // 事件回调
  private eventListeners: Map<string, ((event: GameEvent) => void)[]> = new Map();

  // 时间追踪
  private gameDuration = 60000;  // 60 秒游戏
  private gameStartTime = 0;
  private brushStartTime = 0;
  private successStateEnterTime = 0;  // 进入 success 状态的时间

  // 配置
  private scorePerBrush = 10;  // 每次刷牙 10 分
  private bonusForAccuracy = 5;  // 准确率奖励

  constructor(gameDurationMs = 60000, scorePerBrush = 10) {
    this.brushGesture = new BrushGesture();
    this.gameDuration = gameDurationMs;
    this.scorePerBrush = scorePerBrush;
  }

  /**
   * 初始化游戏
   */
  initialize(): void {
    this.currentState = 'init';
    this.gameStartTime = Date.now();
    this.successStateEnterTime = 0;
    this.gameStats = {
      score: 0,
      brushCount: 0,
      successCount: 0,
      totalBrushTime: 0,
      accuracy: 0
    };
    this.brushGesture.reset();
    this.brushGesture.resetCompletionCount();

    this.emitEvent({
      type: 'game_initialized',
      timestamp: this.gameStartTime
    });
  }

  /**
   * 更新游戏状态
   */
  update(detectionResult: DetectionResult, _deltaMs: number): void {
    const now = Date.now();

    // 检查游戏是否超时
    if (
      this.currentState !== 'init' &&
      now - this.gameStartTime > this.gameDuration
    ) {
      this.endGame();
      return;
    }

    // 执行刷牙手势检测
    const brushResult = this.brushGesture.detect(detectionResult);

    // 调试日志：在 playing 状态时打印检测信息
    if (this.currentState === 'playing') {
      console.log(
        '[GameStateMachine] Playing - Fist:',
        'isFist:',
        brushResult.fist.isFist,
        'curled:',
        brushResult.fist.curledFingersCount,
        'spread:',
        brushResult.fist.handSpread.toFixed(2),
        'Shake:',
        'isShaking:',
        brushResult.shake.isShaking,
        'speed:',
        brushResult.shake.currentSpeed.toFixed(3),
        'ratio:',
        brushResult.shake.highSpeedRatio.toFixed(2)
      );
    }

    // 状态转移逻辑
    this.updateState(brushResult);

    // 更新统计信息
    this.updateStats(brushResult);
  }

  /**
   * 更新游戏状态
   */
  private updateState(brushResult: BrushGestureResult): void {
    switch (this.currentState) {
      case 'init':
        // 初始化完成，进入就绪状态
        this.transitionTo('ready');
        break;

      case 'ready':
        // 等待用户开始
        if (brushResult.teethGate.isOpen) {
          this.transitionTo('playing');
          this.emitEvent({
            type: 'teeth_open_detected',
            timestamp: Date.now(),
            data: brushResult.teethGate
          });
        }
        break;

      case 'playing':
        // 等待刷牙动作
        // 设计文档: "通过后：锁定进入下一状态（避免一会儿闭嘴又退回造成体验差）"
        // 所以不再检查 teethGate.isOpen，只检查 BrushGesture 的 stage
        if (brushResult.stage === 'brushing') {
          this.transitionTo('brushing');
          this.brushStartTime = Date.now();
          this.emitEvent({
            type: 'brushing_started',
            timestamp: this.brushStartTime
          });
        } else if (brushResult.stage === 'complete') {
          // 直接完成（跳过 brushing 状态）
          this.handleBrushingComplete(brushResult);
          this.transitionTo('success');
        } else if (brushResult.stage === 'waiting') {
          // 只有当 BrushGesture 完全重置时才回到 ready
          // 这发生在超时（5秒内未完成刷牙动作）
          this.transitionTo('ready');
        }
        // 注意：不再检查 !brushResult.teethGate.isOpen，保持锁定状态
        break;

      case 'brushing':
        // 检测刷牙是否完成
        if (brushResult.stage === 'complete') {
          this.handleBrushingComplete(brushResult);
          this.transitionTo('success');
        } else if (!brushResult.isBrushing) {
          // 刷牙动作中断，返回就绪
          this.transitionTo('ready');
        }
        break;

      case 'success':
        // 短暂显示成功后，根据当前状态决定下一步
        // 如果用户还在露牙（teethConfirmed），直接回到 playing 继续刷牙
        // 否则回到 ready 等待露牙
        const timeSinceSuccess = Date.now() - this.successStateEnterTime;
        if (timeSinceSuccess > 500) {  // 500ms 后继续
          if (brushResult.stage !== 'waiting') {
            // 用户还在游戏中（露牙锁定未超时），继续 playing
            console.log('[GameStateMachine] success 状态 500ms 后，继续 playing');
            this.transitionTo('playing');
          } else {
            // 露牙锁定已超时，回到 ready
            console.log('[GameStateMachine] success 状态 500ms 后，露牙锁定超时，回到 ready');
            this.transitionTo('ready');
          }
        }
        break;

      case 'gameover':
        // 游戏结束，不再处理输入
        break;
    }
  }

  /**
   * 处理刷牙完成
   */
  private handleBrushingComplete(brushResult: BrushGestureResult): void {
    const brushDuration = Date.now() - this.brushStartTime;

    // 计算准确度（基于手势置信度）
    const accuracy = brushResult.confidence;

    // 计算基础积分
    let points = this.scorePerBrush;

    // 根据准确度增加奖励
    points += Math.floor(this.bonusForAccuracy * accuracy);

    // 更新统计
    this.gameStats.successCount++;
    this.gameStats.totalBrushTime += brushDuration;
    this.gameStats.score += points;

    // 更新平均准确度
    this.gameStats.accuracy =
      (this.gameStats.accuracy * (this.gameStats.successCount - 1) + accuracy) /
      this.gameStats.successCount;

    this.emitEvent({
      type: 'brush_success',
      timestamp: Date.now(),
      data: {
        points,
        brushDuration,
        accuracy,
        totalScore: this.gameStats.score
      }
    });

    console.log(
      '[GameStateMachine] 成功检测刷牙动作！积分:',
      points,
      '，总积分:',
      this.gameStats.score
    );
  }

  /**
   * 更新统计信息
   */
  private updateStats(brushResult: BrushGestureResult): void {
    // 计数刷牙尝试
    if (brushResult.isBrushing && this.currentState === 'brushing') {
      // 已在 handleBrushingComplete 中处理
    }
  }

  /**
   * 状态转移
   */
  private transitionTo(newState: GameState): void {
    if (this.currentState === newState) {
      return;
    }

    const oldState = this.currentState;
    this.currentState = newState;

    // 记录进入 success 状态的时间
    if (newState === 'success') {
      this.successStateEnterTime = Date.now();
    }

    this.emitEvent({
      type: 'state_changed',
      timestamp: Date.now(),
      data: { from: oldState, to: newState }
    });

    console.log(`[GameStateMachine] 状态转移: ${oldState} -> ${newState}`);
  }

  /**
   * 结束游戏
   */
  private endGame(): void {
    this.transitionTo('gameover');

    this.emitEvent({
      type: 'game_over',
      timestamp: Date.now(),
      data: this.gameStats
    });

    console.log('[GameStateMachine] 游戏结束，最终统计:', this.gameStats);
  }

  /**
   * 监听事件
   */
  addEventListener(
    eventType: string,
    callback: (event: GameEvent) => void
  ): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  /**
   * 移除事件监听
   */
  removeEventListener(
    eventType: string,
    callback: (event: GameEvent) => void
  ): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   */
  private emitEvent(event: GameEvent): void {
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach((callback) => callback(event));
  }

  /**
   * 获取当前状态
   */
  getState(): GameState {
    return this.currentState;
  }

  /**
   * 获取游戏统计
   */
  getStats(): GameStats {
    return { ...this.gameStats };
  }

  /**
   * 获取剩余时间（ms）
   */
  getRemainingTime(): number {
    if (!this.gameStartTime) return this.gameDuration;
    const elapsed = Date.now() - this.gameStartTime;
    return Math.max(0, this.gameDuration - elapsed);
  }

  /**
   * 获取进度百分比
   */
  getProgress(): number {
    const remaining = this.getRemainingTime();
    return Math.max(0, 100 - (remaining / this.gameDuration) * 100);
  }
}
