import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { AppCard } from '@/components/app-card';
import { AppText } from '@/components/app-text';
import { Screen } from '@/components/screen';
import { theme } from '@/theme';

const MOCK_DAILY_STREAK = 15;
const MOCK_RESUME_DESTINATION = '/projects';

// TODO: Replace the mock streak and resume destination with authenticated stats and recent-project data.
const LANDING_NAVIGATION_ITEMS = [
  {
    label: 'Projects',
    destination: '/projects',
    icon: { ios: 'folder', android: 'folder', web: 'folder' },
  },
  {
    label: 'Discover',
    destination: '/discover',
    icon: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  },
  {
    label: 'Profile',
    destination: '/profile',
    icon: { ios: 'person', android: 'person', web: 'person' },
  },
] as const;

export default function LandingRoute() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigationHeight = 61 + insets.bottom;
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

          <AppCard style={[styles.streakCard, compact && styles.compactStreakCard]}>
            <View style={styles.streakContent}>
              <AppText color="textOnDark" variant="display">
                daily streak:
              </AppText>
              <AppText color="secondaryAction" style={styles.streakNumber} variant="display">
                {MOCK_DAILY_STREAK}
              </AppText>
              <AppText color="textOnDark" variant="body">
                keep it up!
              </AppText>
            </View>
          </AppCard>

          <AppButton
            accessibilityLabel="Pick up where you left off and open Projects"
            label="Pick up where you left off"
            onPress={() => router.push(MOCK_RESUME_DESTINATION)}
            style={[styles.resumeButton, compact && styles.compactResumeButton]}
            textColor="textOnDark"
          />
        </View>

        <View
          accessibilityRole="toolbar"
          style={[styles.navigation, { height: navigationHeight, paddingBottom: insets.bottom }]}>
          {LANDING_NAVIGATION_ITEMS.map((item) => (
            <Pressable
              accessibilityLabel={item.label}
              accessibilityRole="button"
              key={item.label}
              onPress={() => router.push(item.destination)}
              style={({ pressed }) => [styles.navigationButton, pressed && styles.pressed]}>
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                name={item.icon}
                size={26}
                tintColor={theme.colors.textOnDark}
              />
            </Pressable>
          ))}
        </View>
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
    alignItems: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.large,
    borderWidth: 0,
    elevation: 4,
    marginTop: theme.spacing[7],
    maxWidth: 303,
    padding: theme.spacing[5],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '81%',
  },
  compactStreakCard: {
    marginTop: theme.spacing[4],
    padding: theme.spacing[4],
  },
  streakContent: {
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  streakNumber: {
    fontSize: 64,
    lineHeight: 76,
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
    alignItems: 'center',
    backgroundColor: theme.colors.navigation,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingHorizontal: theme.spacing[2],
    position: 'absolute',
    right: 0,
  },
  navigationButton: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  pressed: {
    opacity: 0.7,
  },
});
