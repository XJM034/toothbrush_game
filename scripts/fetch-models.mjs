#!/usr/bin/env node
/**
 * Ensure MediaPipe .task models and WASM assets exist before build.
 * Files are gitignored, so CI/Zeabur needs to download/copy them.
 */
import * as fsPromises from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const { mkdir, stat } = fsPromises;
const modelsDir = fileURLToPath(new URL('../public/models/', import.meta.url));
const embedModelsDir = fileURLToPath(
  new URL('../prototype/lib/embed/models/', import.meta.url)
);
const wasmSrcDir = fileURLToPath(
  new URL('../node_modules/@mediapipe/tasks-vision/wasm/', import.meta.url)
);
const wasmDestDir = fileURLToPath(new URL('../public/mediapipe/wasm/', import.meta.url));

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

async function dirExists(dirPath) {
  try {
    const stats = await stat(dirPath);
    return stats.isDirectory();
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

async function maybeCopyToEmbed(modelName, sourcePath) {
  if (!(await dirExists(embedModelsDir))) return;
  const targetPath = path.join(embedModelsDir, modelName);
  if (await fileExists(targetPath)) return;
  await ensureDirForFile(targetPath);
  await fsPromises.copyFile(sourcePath, targetPath);
  console.log(`[embed] copied ${modelName} to ${targetPath}`);
}

async function copyDirectory(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await fsPromises.readdir(src, { withFileTypes: true });
  await Promise.all(entries.map(async entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
      return;
    }
    if (entry.isFile()) {
      await fsPromises.copyFile(srcPath, destPath);
    }
  }));
}

async function main() {
  // Copy local WASM assets from node_modules to public
  try {
    await mkdir(wasmDestDir, { recursive: true });
    if (typeof fsPromises.cp === 'function') {
      await fsPromises.cp(wasmSrcDir, wasmDestDir, { recursive: true });
    } else {
      await copyDirectory(wasmSrcDir, wasmDestDir);
    }
    console.log(`[wasm] copied to ${wasmDestDir}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('[wasm] copy failed, will fallback to CDN:', message);
  }

  for (const model of models) {
    const targetPath = path.join(modelsDir, model.name);
    if (await fileExists(targetPath)) {
      console.log(`[models] ${model.name} already exists, skip`);
      await maybeCopyToEmbed(model.name, targetPath);
      continue;
    }

    let downloaded = false;
    for (const src of model.urls) {
      try {
        console.log(`[models] downloading ${model.name} from ${src}`);
        await download(src, targetPath);
        downloaded = true;
        console.log(`[models] saved to ${targetPath}`);
        await maybeCopyToEmbed(model.name, targetPath);
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
