// MediaPipe 模型路径配置
export const mediaPipeConfig = {
  // WASM 路径优先级：本地 -> CDN 兜底
  // 本地路径会在 runtime 中与 modelBasePath 拼接
  wasmPaths: [
    'mediapipe/wasm',
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm'
  ],

  // 模型文件路径（本地 public 目录优先，CDN 兜底）
  models: {
    face: 'models/face_landmarker.task',
    hand: 'models/hand_landmarker.task',
    fallback: {
      face: [
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        'https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/face_landmarker/data/face_landmarker.task'
      ],
      hand: [
        'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        'https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/hand_landmarker/data/hand_landmarker.task'
      ]
    }
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
