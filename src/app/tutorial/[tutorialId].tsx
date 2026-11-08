import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/app-text';
import { ContentDetailPresentation } from '@/components/content-detail-presentation';
import { DetailActionBar } from '@/components/detail-action-bar';
import { DetailReviewList } from '@/components/detail-review-list';
import {
  DetailOverlayShell,
  type CloseAfterAnimation,
} from '@/components/detail-overlay-shell';
import { tutorialDetails } from '@/mocks/tutorial-details';
import type { DetailAction } from '@/types/detail-action';
import { theme } from '@/theme';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { resolveTutorialDetailActions } from '@/utils/tutorial-detail-actions';

type InternalPage = 'main' | 'description' | 'reviews';

export default function TutorialDetailRoute() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { tutorialId } = useLocalSearchParams<{ tutorialId: string }>();
  const tutorial =
    typeof tutorialId === 'string' ? tutorialDetails[tutorialId] : undefined;
  const [page, setPage] = useState<InternalPage>('main');
  const reduceMotion = useReducedMotion();
  const popupInternalWidth = Math.max(
    0,
    width - 2 * (theme.spacing[2] + theme.spacing[5]),
  );
  const previewHeight = popupInternalWidth * (220 / 294);
  const preferredHeight =
    56 +
    theme.spacing[1] +
    previewHeight +
    3 * theme.spacing[5] +
    80 +
    68 +
    68 +
    theme.spacing[4] +
    theme.spacing[3] +
    64 +
    Math.max(insets.bottom, theme.spacing[4]);
  const maxCardHeight = height - Math.max(insets.top + theme.spacing[5], 48);
  const resolution = useMemo(
    () =>
      tutorial
        ? resolveTutorialDetailActions(tutorial)
        : {
            supported: false as const,
            reason: 'Tutorial detail is unavailable.',
          },
    [tutorial],
  );

  const handleBack = useCallback(
    (closeAfterAnimation: CloseAfterAnimation) => {
      if (page === 'main') {
        closeAfterAnimation();
      } else {
        setPage('main');
      }
    },
    [page],
  );

  const handleAction = useCallback(
    (
      action: DetailAction,
      closeAfterAnimation: CloseAfterAnimation,
    ) => {
      if (!tutorial) {
        return;
      }

      if (action.id === 'continue' || action.id === 'start') {
        closeAfterAnimation(() =>
          router.replace({
            pathname: '/workspace/tutorial/[tutorialId]/view',
            params: { tutorialId: tutorial.tutorialId },
          }),
        );
      } else if (action.id === 'edit') {
        closeAfterAnimation(() =>
          router.replace({
            pathname: '/workspace/tutorial/[tutorialId]/edit',
            params: { tutorialId: tutorial.tutorialId },
          }),
        );
      }
    },
    [tutorial],
  );

  const title =
    page === 'main'
      ? tutorial?.title ?? 'Tutorial unavailable'
      : page === 'description'
        ? 'Description'
        : 'Reviews';
  const unavailableMessage = !tutorial
    ? 'This development build does not include this Tutorial yet.'
    : !resolution.supported
      ? resolution.reason
      : '';

  return (
    <DetailOverlayShell
      backAccessibilityLabel={
        page === 'main' ? 'Close tutorial details' : 'Back to tutorial details'
      }
      onBack={handleBack}
      onDismiss={() => router.dismiss()}
      preferredHeight={
        tutorial ? Math.min(preferredHeight, maxCardHeight) : 200
      }
      minimumHeight={maxCardHeight}
      reduceMotion={reduceMotion}
      title={title}
      actions={
        page === 'main' && tutorial && resolution.supported
          ? (closeAfterAnimation) => (
              <DetailActionBar
                actions={resolution.actions}
                onAction={(action) => handleAction(action, closeAfterAnimation)}
              />
            )
          : undefined
      }>
      {!tutorial || !resolution.supported ? (
        <View style={styles.unavailable}>
          <AppText variant="body">{unavailableMessage}</AppText>
        </View>
      ) : page === 'main' ? (
        <ContentDetailPresentation
          contentType="Tutorial"
          detail={tutorial}
          onOpenDescription={() => setPage('description')}
          onOpenReviews={() => setPage('reviews')}
        />
      ) : page === 'description' ? (
        <ScrollView
          contentContainerStyle={styles.internalContent}
          showsVerticalScrollIndicator={false}>
          <AppText variant="body">{tutorial.description}</AppText>
        </ScrollView>
      ) : (
        <DetailReviewList reviews={tutorial.reviews} />
      )}
    </DetailOverlayShell>
  );
}

const styles = StyleSheet.create({
  unavailable: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing[5],
  },
  internalContent: {
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
});
