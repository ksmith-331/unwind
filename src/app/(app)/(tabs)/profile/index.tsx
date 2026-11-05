import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/app-text';
import { ProfileMenuCard } from '@/components/profile-menu-card';
import { Screen } from '@/components/screen';
import { currentUserPreview } from '@/mocks/current-user-preview';
import { theme } from '@/theme';

const PROFILE_DESTINATIONS = [
  {
    title: 'Inventory + Patterns',
    accentColor: 'secondaryAction',
    onPress: () => router.push('/profile/library'),
  },
  {
    title: 'Stats + History',
    accentColor: 'primaryAction',
    onPress: () => router.push('/profile/stats-history'),
  },
  {
    title: 'Settings',
    accentColor: 'highlight',
    onPress: () => router.push('/profile/settings'),
  },
] as const;

const PROFILE_ICON = {
  ios: 'person.fill',
  android: 'person',
  web: 'person',
} as const;

export default function ProfileHomeRoute() {
  return (
    <Screen edges={['top']} contentContainerStyle={styles.screenContent}>
      <View style={styles.page}>
        <Image
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none"
          resizeMode="repeat"
          source={require('../../../../../assets/images/brand/background-texture.png')}
          style={styles.backgroundTexture}
        />
        <View accessible={false} pointerEvents="none" style={styles.decorations}>
          <View style={styles.orangeEllipse} />
          <View style={styles.yellowEllipse} />
          <View style={styles.lightBlueEllipse} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.identity}>
            <View
              accessible
              accessibilityLabel="Profile picture"
              style={styles.avatar}>
              <SymbolView
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                name={PROFILE_ICON}
                size={48}
                tintColor={theme.colors.navigation}
              />
            </View>
            <AppText style={styles.username} variant="heading3">
              {currentUserPreview.username}
            </AppText>
            <AppText color="primaryText" style={styles.email} variant="body">
              {currentUserPreview.email}
            </AppText>
          </View>
          <View style={styles.destinations}>
            {PROFILE_DESTINATIONS.map((destination) => (
              <ProfileMenuCard
                accessibilityLabel={destination.title}
                accentColor={destination.accentColor}
                key={destination.title}
                onPress={destination.onPress}
                title={destination.title}
              />
            ))}
          </View>
        </ScrollView>
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
    backgroundColor: theme.colors.appBackground,
    flex: 1,
    overflow: 'hidden',
  },
  backgroundTexture: {
    ...StyleSheet.absoluteFill,
    opacity: 0.2,
  },
  decorations: {
    ...StyleSheet.absoluteFill,
  },
  orangeEllipse: {
    backgroundColor: theme.brandColors.orange,
    borderRadius: 180,
    height: 360,
    left: -198,
    opacity: 0.42,
    position: 'absolute',
    top: 170,
    width: 360,
  },
  yellowEllipse: {
    backgroundColor: theme.brandColors.yellow,
    borderRadius: 190,
    height: 380,
    opacity: 0.48,
    position: 'absolute',
    right: -210,
    top: -18,
    width: 380,
  },
  lightBlueEllipse: {
    backgroundColor: theme.brandColors.lightBlue,
    borderRadius: 180,
    bottom: -108,
    height: 360,
    opacity: 0.38,
    position: 'absolute',
    right: -135,
    width: 360,
  },
  content: {
    flexGrow: 1,
    paddingBottom: theme.spacing[6],
    paddingHorizontal: theme.spacing[7],
    paddingTop: 40,
  },
  identity: {
    alignItems: 'center',
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryAction,
    borderRadius: theme.radii.pill,
    height: 104,
    justifyContent: 'center',
    marginBottom: 10,
    width: 104,
  },
  username: {
    textAlign: 'center',
  },
  email: {
    marginTop: theme.spacing[1],
    textAlign: 'center',
  },
  destinations: {
    gap: 28,
    marginTop: 42,
  },
});