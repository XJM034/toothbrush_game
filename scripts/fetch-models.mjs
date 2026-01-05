#!/usr/bin/env node
/**
 * Ensure MediaPipe .task models exist before build.
 * Files are gitignored, so CI/Zeabur needs to download them.
 */
import { mkdir, stat } from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const modelsDir = fileURLToPath(new URL('../public/models/', import.meta.url));

const models = [
  {
    name: 'face_landmarker.task',
    urls: [
      'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
      'https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/face_landmarker/data/face_landmarker.task'
    ]
  },
  {
    name: 'hand_landmarker.task',
    urls: [
      'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
      'https://cdn.jsdelivr.net/gh/google/mediapipe@master/mediapipe/tasks/cc/vision/hand_landmarker/data/hand_landmarker.task'
    ]
  }
];

async function ensureDirForFile(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function fileExists(filePath) {
  try {
    const stats = await stat(filePath);
    return stats.size > 1024; // basic sanity check
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`Download failed: ${url} (${res.status})`);
  }
  await ensureDirForFile(dest);
  const fileStream = createWriteStream(dest, { mode: 0o644 });
  await pipeline(res.body, fileStream);
}

async function main() {
  for (const model of models) {
    const targetPath = path.join(modelsDir, model.name);
    if (await fileExists(targetPath)) {
      console.log(`[models] ${model.name} already exists, skip`);
      continue;
    }

    let downloaded = false;
    for (const src of model.urls) {
      try {
        console.log(`[models] downloading ${model.name} from ${src}`);
        await download(src, targetPath);
        downloaded = true;
        console.log(`[models] saved to ${targetPath}`);
        break;
      } catch (err) {
        console.warn(`[models] failed from ${src}: ${err.message}`);
      }
    }

    if (!downloaded) {
      throw new Error(`Unable to download ${model.name} from any source`);
    }
  }
}

main().catch((err) => {
  console.error('[models] prepare failed:', err);
  process.exit(1);
});
