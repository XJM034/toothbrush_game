// 头套渲染器 - 在 Canvas 上渲染卡通头套
import { FaceTrackingResult, AvatarConfig } from '../../types';

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
        console.log('[AvatarRenderer] 头套加载完成:', avatarUrl);
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

    // 获取头套的位置、大小、旋转
    const x = faceResult.faceCenter.x * canvasWidth;
    const y = faceResult.faceCenter.y * canvasHeight;
    const scale = faceResult.faceScale * 2; // 放大系数（根据实际调整）
    const rotation = faceResult.faceRotation;

    // 应用锚点偏移
    const offsetX = (avatarConfig.anchorOffset?.x || 0) * this.avatarImage.width * scale;
    const offsetY = (avatarConfig.anchorOffset?.y || 0) * this.avatarImage.height * scale;

    const avatarWidth = this.avatarImage.width * scale;
    const avatarHeight = this.avatarImage.height * scale;

    // 保存 canvas 状态
    ctx.save();

    // 平移到头套中心
    ctx.translate(x + offsetX, y + offsetY);

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
