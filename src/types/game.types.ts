// 游戏状态枚举
export enum GameState {
  S0_SELECT_AVATAR = 'S0_SELECT_AVATAR',           // 选择头套
  S1_CAMERA_INIT = 'S1_CAMERA_INIT',               // 摄像头初始化
  S2_FACE_TRACKING = 'S2_FACE_TRACKING',           // 人脸追踪
  S3_PROMPT_TEETH = 'S3_PROMPT_TEETH',             // 提示张嘴露牙
  S4_TEETH_CONFIRMED = 'S4_TEETH_CONFIRMED',       // 露牙判定通过
  S5_PROMPT_BRUSH_GESTURE = 'S5_PROMPT_BRUSH_GESTURE', // 提示刷牙动作
  S6_BRUSH_GESTURE_CONFIRMED = 'S6_BRUSH_GESTURE_CONFIRMED', // 刷牙动作通过
  S7_COMPLETED = 'S7_COMPLETED'                    // 完成
}

// 游戏事件枚举
export enum GameEvent {
  AVATAR_SELECTED = 'AVATAR_SELECTED',
  CAMERA_READY = 'CAMERA_READY',
  FACE_DETECTED = 'FACE_DETECTED',
  FACE_LOST = 'FACE_LOST',
  TEETH_GATE_PASS = 'TEETH_GATE_PASS',
  FIST_DETECTED = 'FIST_DETECTED',
  SHAKE_PASS = 'SHAKE_PASS',
  GAME_COMPLETE = 'GAME_COMPLETE'
}

// 头套配置
export interface AvatarConfig {
  id: string;
  name: string;
  imgUrl: string;
  anchorOffset?: { x: number; y: number };  // 头套锚点偏移（相对于人脸中心）
  faceHoleOffset?: { x: number; y: number }; // 脸洞位置偏移（相对于图片中心）
  scale?: number;  // 头套缩放系数
}

// 游戏配置
export interface GameConfig {
  teethGate: {
    openThreshold: number;          // 张嘴阈值
    stableMs: number;               // 稳定时长（ms）
    blendshapeKeys: string[];       // Blendshape 键名
  };
  fist: {
    curledFingersMin: number;       // 最少卷曲手指数
    distanceThreshold: number;      // 卷曲判定距离阈值
  };
  shake: {
    speedThreshold: number;         // 速度阈值
    windowMs: number;               // 滑窗时长（ms）
    highSpeedRatio: number;         // 高速帧占比
    directionChangesMin: number;    // 最少方向变化次数
  };
  rendering: {
    targetFps: number;
    detectionFps: number;           // 推理频率（降采样）
    videoResolution: { width: number; height: number };
    smoothingAlpha: number;         // EMA 平滑系数
  };
  debug: {
    enabled: boolean;
    showLandmarks: boolean;
    showMetrics: boolean;
  };
}

// 游戏上下文值
export interface GameContextValue {
  currentState: GameState;
  selectedAvatar: AvatarConfig | null;
  score: number;
  config: GameConfig;
  updateConfig: (partial: Partial<GameConfig>) => void;
  transitionTo: (state: GameState) => void;
  incrementScore: (points: number) => void;
}
