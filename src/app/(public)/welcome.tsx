import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/app-button';
import { AppText } from '@/components/app-text';
import { AuthBrandFooter } from '@/components/auth-brand-footer';
import { Screen } from '@/components/screen';
import { theme } from '@/theme';

export default function WelcomeRoute() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availableHeight = Math.max(0, height - insets.top - insets.bottom);
  const illustrationHeight = Math.min(
    width * (666 / 750),
    availableHeight * 0.43,
  );
  const illustrationWidth = illustrationHeight * (750 / 666);

  return (
    <Screen
      edges={['top', 'bottom']}
      contentContainerStyle={styles.screenContent}
      style={styles.transparentScreen}>
      <View style={styles.page}>
        <ScrollView
          contentContainerStyle={styles.content}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Image
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            resizeMode="contain"
            source={require('../../../assets/images/brand/knitting-illustration.png')}
            style={[
              styles.illustration,
              { height: illustrationHeight, width: illustrationWidth },
            ]}
          />

          <View style={styles.intro}>
            <AppText color="textOnDark" style={styles.introText} variant="heading2">
              let’s get creative
            </AppText>
          </View>

          <View style={styles.actions}>
            <AppButton
              label="Sign In"
              onPress={() => router.push('/sign-in')}
              style={[styles.actionButton, styles.signInButton]}
              textColor="navigation"
            />
            <AppButton
              label="Register"
              onPress={() => router.push('/register')}
              style={[styles.actionButton, styles.registerButton]}
              textColor="textOnDark"
            />
          </View>
        </ScrollView>
        <AuthBrandFooter />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    paddingHorizontal: 0,
  },
  transparentScreen: {
    backgroundColor: 'transparent',
  },
  page: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: theme.spacing[5],
  },
  illustration: {
    maxWidth: '110%',
  },
  intro: {
    ...theme.shadows.neutral,
    alignItems: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.medium,
    justifyContent: 'center',
    maxWidth: 340,
    minHeight: 52,
    marginTop: theme.spacing[9],
    paddingHorizontal: theme.spacing[4],
    width: '78%',
  },
  introText: {
    fontSize: 30,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing[3],
    marginTop: theme.spacing[8],
    maxWidth: 340,
    width: '70%',
  },
  actionButton: {
    ...theme.shadows.neutral,
    flex: 1,
    minHeight: 48,
    paddingHorizontal: theme.spacing[2],
  },
  signInButton: {
    backgroundColor: theme.colors.secondaryAction,
  },
  registerButton: {
    backgroundColor: theme.colors.navigation,
  },
});
