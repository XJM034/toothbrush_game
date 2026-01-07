/**
 * Mobile Gesture Fixes
 * Prevents context menu, text selection, and other unwanted mobile behaviors
 */

// Prevent context menu (long-press menu)
document.addEventListener('contextmenu', (e) => {
    // Allow on input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    // Allow on iOS preview image (for long-press save)
    if (e.target.id === 'ios-preview-image') {
        return;
    }
    e.preventDefault();
});

// Prevent text selection (except in input fields)
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    // Allow on iOS preview image (for long-press save)
    if (e.target.id === 'ios-preview-image') {
        return;
    }
    e.preventDefault();
});

// Prevent double-tap zoom by adding touch-action to document
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.touchAction = 'manipulation';
});

/**
 * Viewport Variables for Android/Chrome address bar adaptation
 * Sets CSS custom properties:
 *   --app-height: Actual visible viewport height (accounts for Chrome address/bottom bar)
 *   --app-safe-top: Top offset from visual viewport
 *   --app-safe-bottom: Bottom offset (space taken by browser UI)
 */
(function initViewportVariables() {
    const root = document.documentElement;

    function updateViewportVariables() {
        // Use visualViewport if available (Chrome, Safari)
        if (window.visualViewport) {
            const vv = window.visualViewport;
            root.style.setProperty('--app-height', `${vv.height}px`);
            root.style.setProperty('--app-safe-top', `${vv.offsetTop}px`);
            // Calculate bottom offset: difference between window height and visual viewport
            // Use max() to ensure we respect env(safe-area-inset-bottom) for iOS home indicator
            const bottomOffset = Math.max(0, window.innerHeight - (vv.offsetTop + vv.height));
            root.style.setProperty('--app-safe-bottom', `max(${bottomOffset}px, env(safe-area-inset-bottom, 0px))`);

            const layoutHeight = window.innerHeight || vv.height;
            const compact =
                vv.height < 720 ||
                vv.height < layoutHeight - 80;
            root.classList.toggle('viewport-compact', compact);
        } else {
            // Fallback for browsers without visualViewport
            root.style.setProperty('--app-height', `${window.innerHeight}px`);
            root.style.setProperty('--app-safe-top', 'env(safe-area-inset-top, 0px)');
            root.style.setProperty('--app-safe-bottom', 'env(safe-area-inset-bottom, 0px)');
            root.classList.toggle('viewport-compact', window.innerHeight < 720);
        }
    }

    // Initial update
    updateViewportVariables();

    // Listen to viewport changes
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateViewportVariables);
        window.visualViewport.addEventListener('scroll', updateViewportVariables);
    }
    window.addEventListener('resize', updateViewportVariables);
    window.addEventListener('orientationchange', () => {
        // Delay to allow browser to settle after orientation change
        setTimeout(updateViewportVariables, 100);
    });

    // Also update on DOMContentLoaded and load for safety
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateViewportVariables);
    }
    window.addEventListener('load', updateViewportVariables);
})();
