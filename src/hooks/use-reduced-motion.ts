import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const changeReceived = { current: false };
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      changeReceived.current = true;
      setReducedMotion(enabled);
    });

    AccessibilityInfo.isReduceMotionEnabled().then(
      (enabled) => {
        if (isMounted && !changeReceived.current) {
          setReducedMotion(enabled);
        }
      },
      (error: unknown) => {
        console.error('Unable to read the Reduce Motion setting.', error);
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return reducedMotion;
}
