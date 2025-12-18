// 刷牙手势检测器 - 综合检测露出牙齿 + 握拳 + 刷牙动作
import { DetectionResult } from '../../types';
import { TeethGate, TeethGateResult } from './TeethGate';
import { Fist, FistResult } from './Fist';
import { Shake, ShakeResult } from './Shake';
import { distance } from '../utils/geometry';

export interface BrushGestureResult {
  isBrushing: boolean;  // 是否在进行刷牙动作
  teethGate: TeethGateResult;
  fist: FistResult;
  shake: ShakeResult;
  brushingDirection: 'vertical' | 'horizontal' | 'none';  // 刷牙方向
  confidence: number;  // 总置信度
  stage: 'waiting' | 'teeth_open' | 'fist_ready' | 'brushing' | 'complete';  // 阶段
}

export class BrushGesture {
  private teethGate: TeethGate;
  private fist: Fist;
  private shake: Shake;

  // 运动方向追踪
  private prevHandX: number | null = null;
  private prevHandY: number | null = null;
  private movementHistory: { dx: number; dy: number }[] = [];
  private maxMovementHistory = 15;  // ~500ms @ 30fps

  // 刷牙动作状态机
  private lastTeethOpenTime = 0;
  private lastFistReadyTime = 0;
  private brushingStartTime = 0;
  private completionCount = 0;

  // 时间阈值
  private teethOpenTimeout = 5000;  // 5 秒内需要看到握拳
  private fistReadyTimeout = 3000;  // 3 秒内需要开始刷牙
  private minBrushingDuration = 500;  // 最少需要 500ms 的刷牙动作

  constructor() {
    this.teethGate = new TeethGate(0.4, 0.05, 167, 30); // jawOpenThreshold 改为 0.4
    this.fist = new Fist(4, 0.15, 167, 30);
    this.shake = new Shake(0.02, 500, 0.15, 133, 30);
  }

  /**
   * 检测刷牙手势
   */
  detect(
    detectionResult: DetectionResult,
    canvasWidth: number = 640,
    canvasHeight: number = 480
  ): BrushGestureResult {
    const now = Date.now();

    // 执行各个检测器
    const teethGateResult = this.teethGate.detect(
      detectionResult.faceResult
    );
    const fistResult = this.fist.detect(detectionResult.handResult);
    const shakeResult = this.shake.detect(
      detectionResult.handResult,
      canvasWidth,
      canvasHeight
    );

    // 更新运动方向
    const brushingDirection = this.updateBrushingDirection(
      detectionResult,
      canvasWidth,
      canvasHeight
    );

    // 状态机逻辑
    let stage: BrushGestureResult['stage'] = 'waiting';
    let isBrushing = false;

    // 阶段 1: 等待用户露出牙齿
    if (teethGateResult.isOpen) {
      this.lastTeethOpenTime = now;
      stage = 'teeth_open';
    } else if (now - this.lastTeethOpenTime > this.teethOpenTimeout) {
      // 超时，重置
      this.lastTeethOpenTime = 0;
      this.lastFistReadyTime = 0;
      this.brushingStartTime = 0;
      stage = 'waiting';
    }

    // 阶段 2: 等待握拳准备
    if (stage === 'teeth_open') {
      if (fistResult.isFist && teethGateResult.isOpen) {
        this.lastFistReadyTime = now;
        stage = 'fist_ready';
      } else if (now - this.lastTeethOpenTime > this.teethOpenTimeout) {
        // 超时，重置
        this.lastTeethOpenTime = 0;
        this.lastFistReadyTime = 0;
        stage = 'waiting';
      } else {
        stage = 'teeth_open';
      }
    }

    // 阶段 3: 执行刷牙动作
    if (stage === 'fist_ready' || this.brushingStartTime > 0) {
      if (
        fistResult.isFist &&
        shakeResult.isShaking &&
        teethGateResult.isOpen &&
        (brushingDirection === 'vertical' || brushingDirection === 'horizontal')
      ) {
        if (this.brushingStartTime === 0) {
          this.brushingStartTime = now;
        }

        const brushingDuration = now - this.brushingStartTime;
        if (brushingDuration > this.minBrushingDuration) {
          stage = 'brushing';
          isBrushing = true;
        } else {
          stage = 'fist_ready';
        }
      } else {
        // 刷牙动作中断
        if (this.brushingStartTime > 0) {
          const brushingDuration = now - this.brushingStartTime;
          if (brushingDuration > this.minBrushingDuration) {
            // 成功完成一次刷牙
            stage = 'complete';
            this.completionCount++;
            console.log(
              '[BrushGesture] 成功检测到刷牙动作，次数:',
              this.completionCount
            );
          }
        }
        this.brushingStartTime = 0;
        stage = 'waiting';
      }
    }

    // 计算总置信度
    const confidence = this.calculateConfidence(
      teethGateResult,
      fistResult,
      shakeResult,
      stage
    );

    return {
      isBrushing,
      teethGate: teethGateResult,
      fist: fistResult,
      shake: shakeResult,
      brushingDirection,
      confidence,
      stage
    };
  }

  /**
   * 更新刷牙方向
   */
  private updateBrushingDirection(
    detectionResult: DetectionResult,
    canvasWidth: number,
    canvasHeight: number
  ): 'vertical' | 'horizontal' | 'none' {
    if (
      !detectionResult.handResult.landmarks ||
      detectionResult.handResult.landmarks.length < 9
    ) {
      return 'none';
    }

    const handPos = detectionResult.handResult.landmarks[9];
    const currentX = handPos.x * canvasWidth;
    const currentY = handPos.y * canvasHeight;

    if (this.prevHandX === null || this.prevHandY === null) {
      this.prevHandX = currentX;
      this.prevHandY = currentY;
      return 'none';
    }

    const dx = currentX - this.prevHandX;
    const dy = currentY - this.prevHandY;

    this.movementHistory.push({ dx, dy });
    if (this.movementHistory.length > this.maxMovementHistory) {
      this.movementHistory.shift();
    }

    this.prevHandX = currentX;
    this.prevHandY = currentY;

    // 分析近期运动方向
    if (this.movementHistory.length < 5) {
      return 'none';
    }

    const recentMovements = this.movementHistory.slice(-10);

    // 计算主要方向
    let verticalDist = 0;
    let horizontalDist = 0;

    for (const move of recentMovements) {
      verticalDist += Math.abs(move.dy);
      horizontalDist += Math.abs(move.dx);
    }

    // 如果垂直运动 > 水平运动，则为竖直刷动
    if (verticalDist > horizontalDist && verticalDist > 10) {
      return 'vertical';
    }
    // 如果水平运动 > 垂直运动，则为水平刷动
    else if (horizontalDist > verticalDist && horizontalDist > 10) {
      return 'horizontal';
    }

    return 'none';
  }

  /**
   * 计算总置信度
   */
  private calculateConfidence(
    teethGateResult: TeethGateResult,
    fistResult: FistResult,
    shakeResult: ShakeResult,
    stage: BrushGestureResult['stage']
  ): number {
    const weights = {
      waiting: {
        teeth: 0,
        fist: 0,
        shake: 0
      },
      teeth_open: {
        teeth: 0.8,
        fist: 0,
        shake: 0
      },
      fist_ready: {
        teeth: 0.3,
        fist: 0.7,
        shake: 0
      },
      brushing: {
        teeth: 0.2,
        fist: 0.3,
        shake: 0.5
      },
      complete: {
        teeth: 0.2,
        fist: 0.3,
        shake: 0.5
      }
    };

    const w = weights[stage];
    return Math.min(
      teethGateResult.confidence * w.teeth +
        fistResult.confidence * w.fist +
        shakeResult.confidence * w.shake,
      1
    );
  }

  /**
   * 重置状态
   */
  reset(): void {
    this.teethGate.reset();
    this.fist.reset();
    this.shake.reset();
    this.lastTeethOpenTime = 0;
    this.lastFistReadyTime = 0;
    this.brushingStartTime = 0;
    this.movementHistory = [];
    this.prevHandX = null;
    this.prevHandY = null;
  }

  /**
   * 获取完成次数
   */
  getCompletionCount(): number {
    return this.completionCount;
  }

  /**
   * 重置完成计数
   */
  resetCompletionCount(): void {
    this.completionCount = 0;
  }
}
