import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AppBackHeader } from '@/components/app-back-header';
import { AppText } from '@/components/app-text';
import { AuthBrandFooter } from '@/components/auth-brand-footer';
import { AuthDecorations } from '@/components/auth-background';
import { Screen } from '@/components/screen';
import { theme } from '@/theme';

export default function ForgotPasswordRoute() {
  return (
    <Screen
      edges={['top', 'bottom']}
      contentContainerStyle={styles.screenContent}
      style={styles.transparentScreen}>
      <View style={styles.page}>
        <AuthDecorations variant="form" />
        <ScrollView
          contentContainerStyle={styles.content}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <AppBackHeader
            backAccessibilityLabel="Back to Sign In"
            onBack={() => router.replace('/sign-in')}
            title="Forgot Password"
          />
          <View style={styles.message}>
            <AppText variant="body">
              Account recovery is not connected yet. You can return to Sign In.
            </AppText>
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
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[5],
  },
  message: {
    alignSelf: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: '#D9D9D9',
    borderRadius: theme.radii.small,
    borderWidth: 1,
    elevation: 3,
    marginTop: theme.spacing[7],
    maxWidth: 480,
    padding: theme.spacing[5],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
});
