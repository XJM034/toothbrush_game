// 头套渲染器 - 在 Canvas 上渲染卡通头套（Face Filter / AR Hat Overlay）
import { FaceTrackingResult, AvatarConfig } from '../../types';
import { getFaceBoundsFromLandmarks } from '../utils/geometry';

export class AvatarRenderer {
  private avatarImage: HTMLImageElement | null = null;
  private isLoading = false;
  private loadError: string | null = null;

  /**
   * 加载头套图片
   */
  async loadAvatar(avatarUrl: string): Promise<void> {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loadError = null;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        this.avatarImage = img;
        this.isLoading = false;
        console.log('[AvatarRenderer] 头套加载完成:', avatarUrl, img.width, 'x', img.height);
        resolve();
      };

      img.onerror = () => {
        this.loadError = `Failed to load avatar: ${avatarUrl}`;
        this.isLoading = false;
        console.error('[AvatarRenderer] 头套加载失败:', this.loadError);
        reject(new Error(this.loadError));
      };

      img.src = avatarUrl;
    });
  }

  /**
   * 在 Canvas 上渲染头套
   *
   * 头套定位逻辑：
   * 1. 根据人脸宽度计算头套缩放比例
   * 2. 头套的"脸洞"中心对准用户人脸中心
   * 3. 应用配置中的 anchorOffset 和 faceHoleOffset 微调位置
   * 4. 跟随头部旋转
   */
  render(
    ctx: CanvasRenderingContext2D,
    faceResult: FaceTrackingResult,
    avatarConfig: AvatarConfig,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (!this.avatarImage || !faceResult.landmarks) {
      return;
    }

    // 获取详细的人脸定位信息
    const faceBounds = getFaceBoundsFromLandmarks(
      faceResult.landmarks,
      canvasWidth,
      canvasHeight
    );

    // 计算头套缩放比例
    // 基于人脸宽度，使头套宽度约为人脸宽度的 2.0-2.5 倍（覆盖头部）
    const baseScale = (faceBounds.faceWidth * 2.2) / this.avatarImage.width;
    const configScale = avatarConfig.scale || 1.0;
    const scale = baseScale * configScale;

    // 计算头套尺寸
    const avatarWidth = this.avatarImage.width * scale;
    const avatarHeight = this.avatarImage.height * scale;

    // 头套定位点
    // 默认：头套中心的"脸洞"对准人脸中心（两眼中点）
    // faceHoleOffset：脸洞相对于图片中心的偏移（归一化值，-0.5 到 0.5）
    const faceHoleOffsetX = (avatarConfig.faceHoleOffset?.x || 0) * avatarWidth;
    const faceHoleOffsetY = (avatarConfig.faceHoleOffset?.y || 0) * avatarHeight;

    // anchorOffset：额外的位置调整（归一化值）
    const anchorOffsetX = (avatarConfig.anchorOffset?.x || 0) * avatarWidth;
    const anchorOffsetY = (avatarConfig.anchorOffset?.y || 0) * avatarHeight;

    // 最终定位：人脸中心 - 脸洞偏移 + 锚点偏移
    const targetX = faceBounds.center.x - faceHoleOffsetX + anchorOffsetX;
    const targetY = faceBounds.center.y - faceHoleOffsetY + anchorOffsetY;

    // 旋转角度
    const rotation = faceBounds.rotation;

    // 保存 canvas 状态
    ctx.save();

    // 平移到目标位置
    ctx.translate(targetX, targetY);

    // 旋转
    ctx.rotate(rotation);

    // 绘制头套图片（中心对齐）
    ctx.drawImage(
      this.avatarImage,
      -avatarWidth / 2,
      -avatarHeight / 2,
      avatarWidth,
      avatarHeight
    );

    // 恢复 canvas 状态
    ctx.restore();
  }

  /**
   * 获取加载状态
   */
  isReady(): boolean {
    return this.avatarImage !== null && !this.isLoading;
  }

  /**
   * 获取加载错误
   */
  getError(): string | null {
    return this.loadError;
  }

  /**
   * 释放资源
   */
  dispose(): void {
    this.avatarImage = null;
    this.loadError = null;
  }
}
