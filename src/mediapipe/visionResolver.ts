import { FilesetResolver } from '@mediapipe/tasks-vision';

type VisionResolver = Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>;

const resolverCache = new Map<string, Promise<VisionResolver>>();

export async function getVisionFilesetResolver(wasmUrl: string): Promise<VisionResolver> {
  const cached = resolverCache.get(wasmUrl);
  if (cached) {
    return cached;
  }

  const resolverPromise = FilesetResolver.forVisionTasks(wasmUrl)
    .catch((error) => {
      resolverCache.delete(wasmUrl);
      throw error;
    });

  resolverCache.set(wasmUrl, resolverPromise);
  return resolverPromise;
}
