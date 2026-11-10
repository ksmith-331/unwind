import type { ComponentRef, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  BackHandler,
  findNodeHandle,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppBackHeader } from '@/components/app-back-header';
import { theme } from '@/theme';

export type CloseAfterAnimation = (afterClose?: () => void) => void;

type DetailOverlayShellProps = {
  title: string;
  backAccessibilityLabel: string;
  onBack: (closeAfterAnimation: CloseAfterAnimation) => void;
  onDismiss: () => void;
  children: ReactNode;
  preferredHeight: number;
  minimumHeight?: number;
  actions?: (
    closeAfterAnimation: CloseAfterAnimation,
  ) => ReactNode;
  reduceMotion: boolean;
};

export function DetailOverlayShell({
  title,
  backAccessibilityLabel,
  onBack,
  onDismiss,
  children,
  preferredHeight,
  minimumHeight = 0,
  actions,
  reduceMotion,
}: DetailOverlayShellProps) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const topMargin = Math.max(insets.top + theme.spacing[5], 48);
  const maximumHeight = Math.max(0, windowHeight - topMargin);
  const cardHeight = Math.min(
    maximumHeight,
    Math.max(preferredHeight, minimumHeight),
  );
  const [footerHeight, setFooterHeight] = useState(
    theme.spacing[7] * 2 + theme.spacing[3],
  );
  const scrimOpacity = useRef(new Animated.Value(0)).current;
  const cardOffset = useRef(new Animated.Value(windowHeight)).current;
  const backButtonRef = useRef<ComponentRef<typeof Pressable>>(null);
  const hasOpened = useRef(false);
  const isClosing = useRef(false);

  const closeAfterAnimation = useCallback<CloseAfterAnimation>(
    (afterClose) => {
      if (isClosing.current) {
        return;
      }
      isClosing.current = true;

      const finish = () => {
        if (afterClose) {
          afterClose();
        } else {
          onDismiss();
        }
      };

      if (reduceMotion) {
        finish();
        return;
      }

      Animated.parallel([
        Animated.timing(scrimOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(cardOffset, {
          toValue: windowHeight,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          finish();
        } else {
          isClosing.current = false;
        }
      });
    },
    [cardOffset, onDismiss, reduceMotion, scrimOpacity, windowHeight],
  );

  useEffect(() => {
    if (hasOpened.current) {
      return;
    }
    hasOpened.current = true;

    const focusBackButton = () => {
      const reactTag = findNodeHandle(backButtonRef.current);
      if (typeof reactTag === 'number') {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    };

    if (reduceMotion) {
      scrimOpacity.setValue(0.4);
      cardOffset.setValue(0);
      requestAnimationFrame(focusBackButton);
      return;
    }

    Animated.parallel([
      Animated.timing(scrimOpacity, {
        toValue: 0.4,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(cardOffset, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        focusBackButton();
      }
    });
  }, [cardOffset, reduceMotion, scrimOpacity]);

  const handleBack = useCallback(
    () => onBack(closeAfterAnimation),
    [closeAfterAnimation, onBack],
  );

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isClosing.current) {
          return true;
        }
        handleBack();
        return true;
      },
    );
    return () => subscription.remove();
  }, [handleBack]);

  return (
    <View
      accessibilityViewIsModal
      importantForAccessibility="yes"
      style={styles.root}>
      <Animated.View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.scrim, { opacity: scrimOpacity }]}>
        <Pressable
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          onPress={() => closeAfterAnimation()}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          {
            bottom: 0,
            height: cardHeight,
            left: theme.spacing[2],
            right: theme.spacing[2],
            paddingBottom: Math.max(insets.bottom, theme.spacing[4]),
            transform: [{ translateY: cardOffset }],
          },
        ]}>
        <View
          accessibilityViewIsModal
          importantForAccessibility="yes"
          style={styles.cardContent}>
          <AppBackHeader
            backAccessibilityLabel={backAccessibilityLabel}
            backButtonRef={backButtonRef}
            horizontalPadding={0}
            onBack={handleBack}
            title={title}
            titleLines={2}
          />
          <View style={styles.body}>{children}</View>
          <View
            onLayout={(event) => {
              const nextHeight = event.nativeEvent.layout.height;
              setFooterHeight((currentHeight) =>
                Math.max(currentHeight, nextHeight),
              );
            }}
            style={[styles.actions, { minHeight: footerHeight }]}>
            {actions?.(closeAfterAnimation)}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.overlay,
  },
  card: {
    backgroundColor: theme.colors.mutedSurface,
    borderTopLeftRadius: theme.radii.extraLarge,
    borderTopRightRadius: theme.radii.extraLarge,
    elevation: 18,
    overflow: 'hidden',
    position: 'absolute',
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    zIndex: 1,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: theme.spacing[5],
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
  actions: {
    paddingTop: theme.spacing[3],
  },
});
