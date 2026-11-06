import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { getMainNavigationBarHeight, MainNavigationBar } from '@/components/main-navigation-bar';
import { Screen } from '@/components/screen';
import { StreakCard } from '@/components/streak-card';
import { userStatsPreview } from '@/mocks/user-stats-preview';
import { getStreakMessage } from '@/utils/streak-message';
import { theme } from '@/theme';

const MOCK_RESUME_DESTINATION = '/projects';

export default function LandingRoute() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigationHeight = getMainNavigationBarHeight(insets.bottom);
  const availableContentHeight = height - insets.top - navigationHeight;
  const compact = availableContentHeight < 680;
  const illustrationHeight = Math.min(
    width * (666 / 750),
    availableContentHeight * 0.44,
  );
  const illustrationWidth = illustrationHeight * (750 / 666);

  return (
    <Screen
      edges={['top']}
      contentContainerStyle={styles.screenContent}>
      <View style={styles.page}>
        <Image
          accessible={false}
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          resizeMode="repeat"
          source={require('../../../assets/images/brand/background-texture.png')}
          style={styles.backgroundTexture}
        />
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          style={styles.ellipses}>
          <View style={[styles.ellipse, styles.yellowEllipse]} />
          <View style={[styles.ellipse, styles.orangeEllipse]} />
          <View style={[styles.ellipse, styles.blueEllipse]} />
        </View>

        <View
          style={[
            styles.main,
            {
              paddingBottom: navigationHeight,
              paddingTop: compact ? theme.spacing[2] : theme.spacing[4],
            },
          ]}>
          <Image
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            resizeMode="contain"
            source={require('../../../assets/images/brand/knitting-illustration.png')}
            style={[styles.knittingIllustration, { height: illustrationHeight, width: illustrationWidth }]}
          />

          <StreakCard
            accessibilityLabel={`Daily streak: ${userStatsPreview.dailyStreak} days. ${getStreakMessage(userStatsPreview.dailyStreak)}`}
            compact={compact}
            message={getStreakMessage(userStatsPreview.dailyStreak)}
            streakCount={userStatsPreview.dailyStreak}
            style={[styles.streakCard, compact && styles.compactStreakCard]}
          />

          <AppButton
            accessibilityLabel="Pick up where you left off and open Projects"
            label="Pick up where you left off"
            onPress={() => router.push(MOCK_RESUME_DESTINATION)}
            style={[styles.resumeButton, compact && styles.compactResumeButton]}
            textColor="textOnDark"
          />
        </View>

        <MainNavigationBar
          activeTab={null}
          bottomInset={insets.bottom}
          onDiscoverPress={() => router.push('/discover')}
          onProfilePress={() => router.push('/profile')}
          onProjectsPress={() => router.push('/projects')}
          style={styles.navigation}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
  page: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  backgroundTexture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.2,
  },
  ellipses: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  ellipse: {
    borderRadius: 999,
    height: '45%',
    opacity: 0.45,
    position: 'absolute',
    width: '86%',
  },
  yellowEllipse: {
    backgroundColor: theme.colors.highlight,
    right: '-38%',
    top: 0,
  },
  orangeEllipse: {
    backgroundColor: theme.colors.primaryAction,
    left: '-45%',
    top: '29%',
  },
  blueEllipse: {
    backgroundColor: theme.colors.secondaryAction,
    right: '-44%',
    top: '65%',
  },
  main: {
    alignItems: 'center',
    flex: 1,
  },
  knittingIllustration: {
    aspectRatio: 750 / 666,
  },
  streakCard: {
    marginTop: theme.spacing[7],
    width: '81%',
  },
  compactStreakCard: {
    marginTop: theme.spacing[4],
  },
  resumeButton: {
    alignSelf: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.small,
    marginTop: theme.spacing[7] + theme.spacing[5],
    maxWidth: 308,
    minHeight: 50,
    width: '82%',
  },
  compactResumeButton: {
    marginTop: theme.spacing[5],
  },
  navigation: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
