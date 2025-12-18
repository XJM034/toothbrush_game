// 调试渲染器 - 在 Canvas 上显示调试信息和可视化数据
import { FaceTrackingResult, HandTrackingResult } from '../../types';

export class DebugRenderer {
  /**
   * 绘制人脸中心点和方向指示器
   */
  static renderFaceCenter(
    ctx: CanvasRenderingContext2D,
    faceResult: FaceTrackingResult,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const x = faceResult.faceCenter.x * canvasWidth;
    const y = faceResult.faceCenter.y * canvasHeight;

    // 绘制中心点
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // 绘制旋转指示器（从中心指向头部方向）
    const arrowLength = 40;
    const endX = x + Math.cos(faceResult.faceRotation) * arrowLength;
    const endY = y + Math.sin(faceResult.faceRotation) * arrowLength;

    ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // 绘制箭头头
    const headlen = 8;
    const angle = faceResult.faceRotation;
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle - Math.PI / 6), endY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headlen * Math.cos(angle + Math.PI / 6), endY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  /**
   * 绘制脸部参数信息
   */
  static renderFaceInfo(
    ctx: CanvasRenderingContext2D,
    faceResult: FaceTrackingResult,
    x: number,
    y: number,
    showBlendshapes = true
  ): void {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x, y, 300, 120);

    ctx.fillStyle = '#00ff00';
    ctx.font = 'bold 12px monospace';
    let lineY = y + 15;

    // 位置信息
    ctx.fillText(`Face Center: (${faceResult.faceCenter.x.toFixed(2)}, ${faceResult.faceCenter.y.toFixed(2)})`, x + 10, lineY);
    lineY += 15;

    // 缩放信息
    ctx.fillText(`Scale: ${faceResult.faceScale.toFixed(3)}`, x + 10, lineY);
    lineY += 15;

    // 旋转信息（转换为度数）
    const rotationDegrees = (faceResult.faceRotation * 180) / Math.PI;
    ctx.fillText(`Rotation: ${rotationDegrees.toFixed(1)}°`, x + 10, lineY);
    lineY += 15;

    // Blendshapes 信息
    if (showBlendshapes && faceResult.blendshapes) {
      const jawOpen = faceResult.blendshapes.get('jawOpen') ?? 0;
      const mouthOpen = faceResult.blendshapes.get('mouthOpen') ?? 0;

      ctx.fillText(`Jaw Open: ${jawOpen.toFixed(3)}`, x + 10, lineY);
      lineY += 15;

      ctx.fillText(`Mouth Open: ${mouthOpen.toFixed(3)}`, x + 10, lineY);
    }
  }

  /**
   * 绘制手部中心点
   */
  static renderHandCenter(
    ctx: CanvasRenderingContext2D,
    handResult: HandTrackingResult,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (!handResult.landmarks || handResult.landmarks.length < 9) {
      return;
    }

    // 手掌中心（通常是第 9 个点 - 手掌中心）
    const palmCenter = handResult.landmarks[9];
    const x = palmCenter.x * canvasWidth;
    const y = palmCenter.y * canvasHeight;

    ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }

  /**
   * 绘制手指速度向量（用于检测刷牙动作）
   */
  static renderHandVelocity(
    ctx: CanvasRenderingContext2D,
    handResult: HandTrackingResult,
    prevHandResult: HandTrackingResult | null,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (!handResult.landmarks || !prevHandResult?.landmarks) {
      return;
    }

    // 计算手掌中心的速度
    const currCenter = handResult.landmarks[9];
    const prevCenter = prevHandResult.landmarks[9];

    const vx = (currCenter.x - prevCenter.x) * canvasWidth;
    const vy = (currCenter.y - prevCenter.y) * canvasHeight;
    const speed = Math.sqrt(vx * vx + vy * vy);

    if (speed > 2) {
      const x = currCenter.x * canvasWidth;
      const y = currCenter.y * canvasHeight;

      // 绘制速度向量
      ctx.strokeStyle = `rgba(255, 0, 255, ${Math.min(speed / 50, 0.8)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + vx * 0.3, y + vy * 0.3);
      ctx.stroke();

      // 绘制速度值
      ctx.fillStyle = 'rgba(255, 0, 255, 0.8)';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`Speed: ${speed.toFixed(1)}`, x + 10, y - 5);
    }
  }

  /**
   * 绘制 FPS 计数器
   */
  static renderFPS(
    ctx: CanvasRenderingContext2D,
    fps: number,
    x: number = 10,
    y: number = 30
  ): void {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x, y - 20, 100, 30);

    ctx.fillStyle = fps > 30 ? '#00ff00' : fps > 15 ? '#ffff00' : '#ff0000';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`FPS: ${fps}`, x + 10, y);
  }

  /**
   * 绘制状态指示器
   */
  static renderStatus(
    ctx: CanvasRenderingContext2D,
    status: {
      faceDetected: boolean;
      handDetected: boolean;
      isProcessing?: boolean;
    },
    x: number = 10,
    y: number = 70
  ): void {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(x, y - 20, 200, 60);

    ctx.font = 'bold 12px monospace';
    let lineY = y;

    // Face 状态
    ctx.fillStyle = status.faceDetected ? '#00ff00' : '#ff6666';
    ctx.fillText(`Face: ${status.faceDetected ? '✓' : '✗'}`, x + 10, lineY);
    lineY += 15;

    // Hand 状态
    ctx.fillStyle = status.handDetected ? '#00ff00' : '#ff6666';
    ctx.fillText(`Hand: ${status.handDetected ? '✓' : '✗'}`, x + 10, lineY);
    lineY += 15;

    // Processing 状态
    if (status.isProcessing !== undefined) {
      ctx.fillStyle = status.isProcessing ? '#ffff00' : '#666666';
      ctx.fillText(`Processing: ${status.isProcessing ? '⏳' : '✓'}`, x + 10, lineY);
    }
  }
}
