// 几何计算工具函数

import { Point, Point3D } from './smoothing';
import { NormalizedLandmark, WorldLandmark } from '../../types';

/**
 * 计算两点之间的欧几里得距离
 */
export function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 计算三维空间两点距离
 */
export function distance3D(p1: Point3D, p2: Point3D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * 计算两点连线的角度（弧度）
 * 用于计算人脸的旋转角度
 */
export function angle(p1: Point, p2: Point): number {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * 计算点的速度（距离 / 时间）
 */
export function velocity(
  p1: Point3D,
  p2: Point3D,
  deltaTimeMs: number
): number {
  const dist = distance3D(p1, p2);
  return dist / (deltaTimeMs / 1000); // 转换为 m/s 或单位/s
}

/**
 * 计算人脸中心、尺度和旋转角度
 * 基于眼睛位置
 */
export function getFaceTransformFromLandmarks(
  landmarks: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number
): { center: Point; scale: number; rotation: number } {
  // Face Landmarks 中的眼睛索引
  const leftEyeIdx = 33;   // 左眼外侧
  const rightEyeIdx = 263; // 右眼外侧

  if (landmarks.length < rightEyeIdx + 1) {
    return {
      center: { x: canvasWidth / 2, y: canvasHeight / 2 },
      scale: 1,
      rotation: 0
    };
  }

  const leftEye = landmarks[leftEyeIdx];
  const rightEye = landmarks[rightEyeIdx];

  // 人脸中心（两眼中点）
  const centerX = (leftEye.x + rightEye.x) / 2;
  const centerY = (leftEye.y + rightEye.y) / 2;

  // 转换为像素坐标
  const center: Point = {
    x: centerX * canvasWidth,
    y: centerY * canvasHeight
  };

  // 人脸尺度（两眼距离）
  const eyeDistance = distance(
    { x: leftEye.x * canvasWidth, y: leftEye.y * canvasHeight },
    { x: rightEye.x * canvasWidth, y: rightEye.y * canvasHeight }
  );
  const scale = eyeDistance / canvasHeight * 3; // 经验系数调整

  // 人脸旋转角度（Roll）
  const rotation = angle(
    { x: leftEye.x * canvasWidth, y: leftEye.y * canvasHeight },
    { x: rightEye.x * canvasWidth, y: rightEye.y * canvasHeight }
  );

  return { center, scale, rotation };
}

/**
 * 获取人脸边界框和更多定位信息
 * 用于头套定位
 */
export function getFaceBoundsFromLandmarks(
  landmarks: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number
): {
  center: Point;           // 人脸中心（两眼中点）
  forehead: Point;         // 额头位置
  chin: Point;             // 下巴位置
  eyeDistance: number;     // 两眼距离（像素）
  faceHeight: number;      // 人脸高度（额头到下巴）
  faceWidth: number;       // 人脸宽度
  rotation: number;        // 旋转角度
} {
  // MediaPipe Face Landmarks 索引
  const leftEyeIdx = 33;    // 左眼外侧
  const rightEyeIdx = 263;  // 右眼外侧
  const foreheadIdx = 10;   // 额头中心（眉间上方）
  const chinIdx = 152;      // 下巴
  const leftFaceIdx = 234;  // 左脸边缘
  const rightFaceIdx = 454; // 右脸边缘

  const defaultResult = {
    center: { x: canvasWidth / 2, y: canvasHeight / 2 },
    forehead: { x: canvasWidth / 2, y: canvasHeight / 3 },
    chin: { x: canvasWidth / 2, y: canvasHeight * 2 / 3 },
    eyeDistance: canvasWidth * 0.2,
    faceHeight: canvasHeight * 0.4,
    faceWidth: canvasWidth * 0.3,
    rotation: 0
  };

  if (landmarks.length < 468) {
    return defaultResult;
  }

  const leftEye = landmarks[leftEyeIdx];
  const rightEye = landmarks[rightEyeIdx];
  const forehead = landmarks[foreheadIdx];
  const chin = landmarks[chinIdx];
  const leftFace = landmarks[leftFaceIdx];
  const rightFace = landmarks[rightFaceIdx];

  // 人脸中心（两眼中点）
  const center: Point = {
    x: ((leftEye.x + rightEye.x) / 2) * canvasWidth,
    y: ((leftEye.y + rightEye.y) / 2) * canvasHeight
  };

  // 额头位置
  const foreheadPoint: Point = {
    x: forehead.x * canvasWidth,
    y: forehead.y * canvasHeight
  };

  // 下巴位置
  const chinPoint: Point = {
    x: chin.x * canvasWidth,
    y: chin.y * canvasHeight
  };

  // 两眼距离
  const eyeDistance = distance(
    { x: leftEye.x * canvasWidth, y: leftEye.y * canvasHeight },
    { x: rightEye.x * canvasWidth, y: rightEye.y * canvasHeight }
  );

  // 人脸高度（额头到下巴）
  const faceHeight = distance(foreheadPoint, chinPoint);

  // 人脸宽度（左右脸边缘）
  const faceWidth = distance(
    { x: leftFace.x * canvasWidth, y: leftFace.y * canvasHeight },
    { x: rightFace.x * canvasWidth, y: rightFace.y * canvasHeight }
  );

  // 旋转角度
  const rotation = angle(
    { x: leftEye.x * canvasWidth, y: leftEye.y * canvasHeight },
    { x: rightEye.x * canvasWidth, y: rightEye.y * canvasHeight }
  );

  return {
    center,
    forehead: foreheadPoint,
    chin: chinPoint,
    eyeDistance,
    faceHeight,
    faceWidth,
    rotation
  };
}

/**
 * 归一化坐标转像素坐标
 */
export function normalizedToPixel(
  normalized: NormalizedLandmark,
  canvasWidth: number,
  canvasHeight: number
): Point {
  return {
    x: normalized.x * canvasWidth,
    y: normalized.y * canvasHeight
  };
}

/**
 * 像素坐标转归一化坐标
 */
export function pixelToNormalized(
  pixel: Point,
  canvasWidth: number,
  canvasHeight: number
): Point {
  return {
    x: pixel.x / canvasWidth,
    y: pixel.y / canvasHeight
  };
}

/**
 * 检查点是否在画布内
 */
export function isPointInCanvas(
  point: Point,
  canvasWidth: number,
  canvasHeight: number
): boolean {
  return point.x >= 0 && point.x <= canvasWidth &&
         point.y >= 0 && point.y <= canvasHeight;
}

/**
 * 计算两个角度的差值（考虑角度环绕）
 */
export function angleDifference(angle1: number, angle2: number): number {
  let diff = angle2 - angle1;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  return Math.abs(diff);
}
