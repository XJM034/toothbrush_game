// 握拳检测器 - 检测用户是否握拳（手指弯曲并靠近）
import { HandTrackingResult } from '../../types';
import { distance } from '../utils/geometry';

export interface FistResult {
  isFist: boolean;  // 是否握拳
  curledFingersCount: number;  // 弯曲的手指数量 (0-5)
  handSpread: number;  // 手部张开程度 (0-1)
  confidence: number;  // 置信度 (0-1)
}

export class Fist {
  // 握拳检测参数 - 设计文档 5.3: "至少 4 根手指满足'卷曲'即可认为握拳"
  private curledFingerThreshold = 3;  // 至少 3 根手指弯曲（稍微宽松一点）

  // 手部关键点索引（MediaPipe Hand Landmarker）
  // 0: 手腕
  // 1-4: 拇指 (MCP, PIP, DIP, TIP)
  // 5-8: 食指 (MCP, PIP, DIP, TIP)
  // 9-12: 中指 (MCP, PIP, DIP, TIP)
  // 13-16: 无名指 (MCP, PIP, DIP, TIP)
  // 17-20: 小指 (MCP, PIP, DIP, TIP)

  private fingerTipIndices = [4, 8, 12, 16, 20];  // 各手指的顶端点索引
  private fingerBaseIndices = [2, 6, 10, 14, 18];  // 各手指的基部点索引

  constructor(curledFingerThreshold = 3) {
    this.curledFingerThreshold = curledFingerThreshold;
  }

  /**
   * 检测握拳状态
   * 设计文档 5.3: "至少 4 根手指满足'卷曲'即可认为握拳"
   * 注意：不需要稳定性检测，因为用户在晃动时手会自然不稳定
   */
  detect(handResult: HandTrackingResult): FistResult {
    if (!handResult.landmarks || handResult.landmarks.length < 21) {
      return {
        isFist: false,
        curledFingersCount: 0,
        handSpread: 1,
        confidence: 0
      };
    }

    const landmarks = handResult.landmarks;

    // 计算各手指是否弯曲
    let curledFingersCount = 0;
    for (let i = 0; i < 5; i++) {
      const isCurled = this.isFingerCurled(
        landmarks[this.fingerBaseIndices[i]],
        landmarks[this.fingerTipIndices[i]],
        landmarks[0]  // 手腕作为参考点
      );
      if (isCurled) {
        curledFingersCount++;
      }
    }

    // 计算手部展开程度（仅用于调试显示）
    const handSpread = this.calculateHandSpread(landmarks);

    // 握拳判断：简化为只检查手指弯曲数量（设计文档要求）
    // 不再检查 handSpread 和稳定性，因为晃动时会导致不稳定
    const isFist = curledFingersCount >= this.curledFingerThreshold;

    // 计算置信度（基于弯曲手指比例）
    const confidence = curledFingersCount / 5;

    return {
      isFist,
      curledFingersCount,
      handSpread,
      confidence
    };
  }

  /**
   * 判断单根手指是否弯曲
   */
  private isFingerCurled(
    basePoint: any,
    tipPoint: any,
    wristPoint: any
  ): boolean {
    // 计算手指长度（基部到顶端）
    const fingerLength = distance(basePoint, tipPoint);

    // 计算手腕到基部的距离（用作参考）
    const wristToBase = distance(wristPoint, basePoint);

    // 如果手指长度 < 手腕到基部距离的 0.4，则认为手指弯曲
    // （弯曲时顶端会靠近基部）
    return fingerLength < wristToBase * 0.4;
  }

  /**
   * 计算手部展开程度（0 = 完全握拳，1 = 完全张开）
   */
  private calculateHandSpread(landmarks: any[]): number {
    const palmCenter = landmarks[9];  // 手掌中心

    // 计算所有指尖到手掌中心的平均距离
    let totalDistance = 0;
    for (const tipIdx of this.fingerTipIndices) {
      totalDistance += distance(landmarks[tipIdx], palmCenter);
    }
    const avgDistance = totalDistance / this.fingerTipIndices.length;

    // 计算最大可能距离（参考：手腕到指尖）
    const wristToTip = distance(landmarks[0], landmarks[this.fingerTipIndices[1]]);

    // 规范化展开程度
    const spread = Math.min(avgDistance / (wristToTip * 0.5), 1);
    return spread;
  }

  /**
   * 重置状态（简化版本，无需稳定性追踪）
   */
  reset(): void {
    // 不再需要重置稳定性计数器
  }
}
