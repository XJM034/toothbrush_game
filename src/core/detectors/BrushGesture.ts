// 刷牙手势检测器 - 综合检测露出牙齿 + 握拳 + 刷牙动作
import { DetectionResult } from '../../types';
import { TeethGate, TeethGateResult } from './TeethGate';
import { Fist, FistResult } from './Fist';
import { Shake, ShakeResult } from './Shake';
import { distance as _distance } from '../utils/geometry';
import { debugLog } from '../utils/debug';

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
  private brushingStartTime = 0;
  private completionCount = 0;
  private teethConfirmed = false;  // 露牙已确认（锁定状态，设计文档要求）

  // 时间阈值（幼儿友好优化）
  private minBrushingDuration = 300;  // 幼儿友好：300ms 即可完成（原 800ms）

  constructor() {
    const detectionFps = 20; // 与 runtime 中的检测频率保持一致，避免额外等待。

    this.teethGate = new TeethGate(0.4, 0.05, 167, detectionFps); // jawOpenThreshold 改为 0.4
    // 幼儿友好模式：大幅降低检测门槛
    this.fist = new Fist(2); // 只需 2 根手指弯曲即可（原 3 根）
    // Shake 参数: speedThreshold=0.008 (原 0.02), highSpeedRatio=0.06 (原 0.15), stableMs=80 (原 133)
    this.shake = new Shake(0.008, 500, 0.06, 80, detectionFps);
  }

  /**
   * 检测刷牙手势
   *
   * 设计文档流程（分步骤）:
   * 1. S3_PromptTeeth: 等待用户露出牙齿
   * 2. S4_TeethConfirmed: 露牙通过 → 锁定状态（避免闭嘴又退回）
   * 3. S5_PromptBrushGesture: 等待握拳+晃动
   * 4. S6_BrushGestureConfirmed: 动作通过 → 得分
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

    // 更新运动方向（可选条件）
    const brushingDirection = this.updateBrushingDirection(
      detectionResult,
      canvasWidth,
      canvasHeight
    );

    // 状态机逻辑
    let stage: BrushGestureResult['stage'] = 'waiting';
    let isBrushing = false;

    // ========== 阶段 1: 露牙检测与锁定管理 ==========
    // 改进：一旦露牙确认，整局游戏保持锁定（闭嘴刷牙也合理）
    if (teethGateResult.isOpen) {
      // 用户正在露牙，锁定状态
      this.teethConfirmed = true;
    }
    // 注意：移除了超时解锁逻辑，teethConfirmed 一旦为 true 就保持到游戏结束

    // ========== 阶段 2: 根据锁定状态决定 stage ==========
    if (this.teethConfirmed) {
      stage = 'teeth_open';

      // ========== 阶段 3: 刷牙动作检测（可连续得分）==========
      const isFistDetected = fistResult.isFist;
      const isShaking = shakeResult.isShaking;

      if (isFistDetected && isShaking) {
        if (this.brushingStartTime === 0) {
          this.brushingStartTime = now;
          debugLog('[BrushGesture] 检测到握拳+晃动，开始计时');
        }

        const brushingDuration = now - this.brushingStartTime;
        isBrushing = true;
        stage = 'brushing';

        if (brushingDuration >= this.minBrushingDuration) {
          // 成功完成一次刷牙！
          stage = 'complete';
          this.completionCount++;
          debugLog('[BrushGesture] ✅ 成功完成刷牙动作！次数:', this.completionCount);

          // 重置刷牙计时，但不重置 teethConfirmed，允许连续得分
          this.brushingStartTime = 0;
          // 注意：保持 teethConfirmed = true，用户可以立即开始下一次刷牙
        }
      } else if (this.brushingStartTime > 0) {
        // 动作中断，检查是否已达到时长要求
        const brushingDuration = now - this.brushingStartTime;

        if (brushingDuration >= this.minBrushingDuration) {
          // 成功完成一次刷牙！
          stage = 'complete';
          this.completionCount++;
          debugLog('[BrushGesture] ✅ 成功完成刷牙动作！次数:', this.completionCount);
          this.brushingStartTime = 0;
        } else {
          // 动作中断但未达到时长
          debugLog('[BrushGesture] 动作中断，已持续:', brushingDuration, 'ms');
          this.brushingStartTime = 0;
          stage = 'teeth_open';
        }
      }
    } else {
      stage = 'waiting';
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

    // 分析近期运动方向（降低到 3 帧即可开始检测）
    if (this.movementHistory.length < 3) {
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

    // 降低阈值从 10 到 5，使方向检测更敏感
    const directionThreshold = 5;

    // 如果垂直运动 > 水平运动，则为竖直刷动
    if (verticalDist > horizontalDist && verticalDist > directionThreshold) {
      return 'vertical';
    }
    // 如果水平运动 > 垂直运动，则为水平刷动
    else if (horizontalDist > verticalDist && horizontalDist > directionThreshold) {
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
    this.brushingStartTime = 0;
    this.teethConfirmed = false;
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
