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
    e.preventDefault();
});

// Prevent text selection (except in input fields)
document.addEventListener('selectstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    e.preventDefault();
});

// Prevent double-tap zoom by adding touch-action to document
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.touchAction = 'manipulation';
});
