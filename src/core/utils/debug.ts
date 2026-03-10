declare global {
  interface Window {
    __BRUSH_DEBUG__?: boolean;
  }
}

export function isBrushDebugEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.__BRUSH_DEBUG__ === true) {
    return true;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') {
      return true;
    }

    return window.localStorage?.getItem('brushDebug') === '1';
  } catch {
    return false;
  }
}

export function debugLog(...args: unknown[]): void {
  if (isBrushDebugEnabled()) {
    console.log(...args);
  }
}
