// EMA 平滑算法 - 指数移动平均（Exponential Moving Average）
// 用于去抖动和平滑轨迹

export interface Point {
  x: number;
  y: number;
}

export interface Point3D extends Point {
  z: number;
}

/**
 * 计算 EMA 平滑值
 * @param prevValue 前一个平滑值
 * @param currentValue 当前值
 * @param alpha 平滑系数 (0-1)，越小越平滑（约 0.3 平衡抖动和响应性）
 * @returns 平滑后的值
 */
export function smoothScalar(
  prevValue: number,
  currentValue: number,
  alpha: number
): number {
  return prevValue * (1 - alpha) + currentValue * alpha;
}

/**
 * 平滑二维点
 */
export function smoothPoint(
  prevPoint: Point,
  currentPoint: Point,
  alpha: number
): Point {
  return {
    x: smoothScalar(prevPoint.x, currentPoint.x, alpha),
    y: smoothScalar(prevPoint.y, currentPoint.y, alpha)
  };
}

/**
 * 平滑三维点
 */
export function smoothPoint3D(
  prevPoint: Point3D,
  currentPoint: Point3D,
  alpha: number
): Point3D {
  return {
    x: smoothScalar(prevPoint.x, currentPoint.x, alpha),
    y: smoothScalar(prevPoint.y, currentPoint.y, alpha),
    z: smoothScalar(prevPoint.z, currentPoint.z, alpha)
  };
}

/**
 * 线性插值
 */
export function lerp(
  from: number,
  to: number,
  t: number
): number {
  return from + (to - from) * t;
}
