# MediaPipe 模型文件下载说明

由于模型文件较大（~20MB），需要手动下载到此目录。

## 下载链接

### Face Landmarker (~11MB)
```bash
curl -o face_landmarker.task https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
```

### Hand Landmarker (~8MB)
```bash
curl -o hand_landmarker.task https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task
```

## 或使用 wget

```bash
wget https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task
wget https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task
```

## 验证

下载完成后，此目录应该包含：
- face_landmarker.task (~11MB)
- hand_landmarker.task (~8MB)
