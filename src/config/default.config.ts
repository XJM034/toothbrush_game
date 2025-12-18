import { GameConfig } from '../types';

export const defaultConfig: GameConfig = {
  teethGate: {
    openThreshold: 0.5,           // 张嘴阈值
    stableMs: 400,                // 稳定时长（ms）
    blendshapeKeys: ['jawOpen', 'mouthOpen']
  },
  fist: {
    curledFingersMin: 4,          // 最少卷曲手指数
    distanceThreshold: 0.15       // 卷曲判定距离阈值
  },
  shake: {
    speedThreshold: 0.05,         // 速度阈值（需实测调整）
    windowMs: 800,                // 滑窗时长（ms）
    highSpeedRatio: 0.35,         // 高速帧占比
    directionChangesMin: 3        // 最少方向变化次数
  },
  rendering: {
    targetFps: 30,
    detectionFps: 20,             // 推理频率（降采样）
    videoResolution: { width: 640, height: 480 },
    smoothingAlpha: 0.3           // EMA 平滑系数
  },
  debug: {
    enabled: false,               // 默认关闭，通过 URL 参数开启
    showLandmarks: true,
    showMetrics: true
  }
};

// URL 参数解析函数
export const loadConfigFromUrl = (baseConfig: GameConfig): GameConfig => {
  const params = new URLSearchParams(window.location.search);
  const config = JSON.parse(JSON.stringify(baseConfig)); // deep clone

  // 支持点记法: ?teethGate.openThreshold=0.6
  params.forEach((value, key) => {
    const keys = key.split('.');
    let current: any = config;

    for (let i = 0; i < keys.length - 1; i++) {
      if (current[keys[i]] === undefined) return;
      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];
    if (current[lastKey] !== undefined) {
      // 尝试解析为数字或布尔值
      if (value === 'true') {
        current[lastKey] = true;
      } else if (value === 'false') {
        current[lastKey] = false;
      } else {
        const numValue = parseFloat(value);
        current[lastKey] = isNaN(numValue) ? value : numValue;
      }
    }
  });

  return config;
};
