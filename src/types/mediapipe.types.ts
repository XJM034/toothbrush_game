// MediaPipe 归一化关键点
export interface NormalizedLandmark {
  x: number;  // 0-1 归一化坐标
  y: number;
  z?: number;
}

// MediaPipe 世界坐标关键点
export interface WorldLandmark {
  x: number;  // 真实世界坐标（米）
  y: number;
  z: number;
}

// 人脸追踪结果
export interface FaceTrackingResult {
  landmarks: NormalizedLandmark[] | null;        // 468 点人脸关键点
  blendshapes: Map<string, number> | null;       // 表情系数
  faceCenter: { x: number; y: number };          // 计算的人脸中心
  faceScale: number;                             // 两眼距离（归一化）
  faceRotation: number;                          // Roll 角度（弧度）
  timestamp: number;                             // 时间戳
}

// 手部追踪结果
export interface HandTrackingResult {
  landmarks: NormalizedLandmark[] | null;        // 21 点手关键点
  worldLandmarks: WorldLandmark[] | null;        // 3D 世界坐标
  handedness: string | null;                     // "Left" / "Right"
  timestamp: number;
}

// MediaPipe 检测结果组合
export interface DetectionResult {
  faceResult: FaceTrackingResult;
  handResult: HandTrackingResult;
}
