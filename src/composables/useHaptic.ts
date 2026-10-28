export function useHaptic() {
  function trigger(pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        switch (pattern) {
          case 'light': navigator.vibrate(10); break;
          case 'medium': navigator.vibrate(25); break;
          case 'heavy': navigator.vibrate(50); break;
          case 'success': navigator.vibrate([15, 40, 20]); break;
          case 'error': navigator.vibrate([40, 40, 40]); break;
        }
      } catch {
        // Ignore devices that block vibration
      }
    }
  }

  return { trigger }
}
