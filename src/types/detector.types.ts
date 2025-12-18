import { NormalizedLandmark, WorldLandmark } from './mediapipe.types';

// 露牙判定结果
export interface TeethGateResult {
  isPassing: boolean;           // 当前是否通过
  currentScore: number;         // 当前开口分数
  stableMs: number;             // 已稳定多久
  confidence: number;           // 置信度
}

// 握拳判定结果
export interface FistResult {
  isFist: boolean;
  curledFingers: number;        // 弯曲手指数量
  confidence: number;
}

// 晃动判定结果
export interface ShakeResult {
  isShaking: boolean;
  currentSpeed: number;
  highSpeedRatio: number;       // 滑窗内高速帧占比
  directionChanges: number;     // 方向变化次数
}

// 刷牙动作判定结果
export interface BrushGestureResult {
  isPassing: boolean;           // 握拳 AND 晃动同时满足
  fistResult: FistResult;
  shakeResult: ShakeResult;
  stableMs: number;             // 满足条件的持续时间
}

// 检测器接口
export interface ITeethGateDetector {
  update(blendshapes: Map<string, number> | null, timestamp: number): TeethGateResult;
  reset(): void;
}

export interface IFistDetector {
  detect(handLandmarks: NormalizedLandmark[] | null): FistResult;
}

export interface IShakeDetector {
  update(wristPos: WorldLandmark | null, timestamp: number): ShakeResult;
  reset(): void;
}

export interface IBrushGestureDetector {
  update(
    handLandmarks: NormalizedLandmark[] | null,
    worldLandmarks: WorldLandmark[] | null,
    timestamp: number
  ): BrushGestureResult;
  reset(): void;
}
