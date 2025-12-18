// MediaPipe 模型路径配置
export const mediaPipeConfig = {
  // WASM 路径（使用 CDN）
  wasmPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm',

  // 模型文件路径（本地 public 目录）
  models: {
    face: '/models/face_landmarker.task',
    hand: '/models/hand_landmarker.task'
  },

  // 模型初始化选项
  faceOptions: {
    numFaces: 1,                        // 只检测一张脸
    minFaceDetectionConfidence: 0.5,
    minFacePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
    outputFaceBlendshapes: true,        // 输出 Blendshapes
    outputFacialTransformationMatrixes: false  // MVP 暂不用变换矩阵
  },

  handOptions: {
    numHands: 1,                        // 只检测一只手
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
  }
};
