import { useMemo } from 'react';
import { PanResponder } from 'react-native';
import type { Href } from 'expo-router';

type SwipeTab = {
  route: Href;
  active: boolean;
};

const MIN_SWIPE_DISTANCE = 48;

export function useSubTabSwipe(
  tabs: readonly SwipeTab[],
  onNavigate: (route: Href) => void,
) {
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.active));

  return useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_event, gesture) =>
          Math.abs(gesture.dx) >= MIN_SWIPE_DISTANCE &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.3,
        onPanResponderRelease: (_event, gesture) => {
          if (
            Math.abs(gesture.dx) < MIN_SWIPE_DISTANCE ||
            Math.abs(gesture.dx) <= Math.abs(gesture.dy) * 1.3
          ) {
            return;
          }

          const nextIndex = activeIndex + (gesture.dx < 0 ? 1 : -1);
          const nextTab = tabs[nextIndex];
          if (nextTab) {
            onNavigate(nextTab.route);
          }
        },
      }),
    [activeIndex, onNavigate, tabs],
  );
}
