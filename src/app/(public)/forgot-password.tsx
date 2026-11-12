import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/app-text';
import { AuthBrandFooter } from '@/components/auth-brand-footer';
import { Screen } from '@/components/screen';
import { theme } from '@/theme';

export default function ForgotPasswordRoute() {
  return (
    <Screen
      edges={['top', 'bottom']}
      contentContainerStyle={styles.screenContent}
      style={styles.transparentScreen}>
      <View style={styles.page}>
        <Pressable
          accessibilityLabel="Back to Sign In"
          accessibilityRole="button"
          onPress={() => router.replace('/sign-in')}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size={22}
            tintColor={theme.colors.navigation}
          />
        </Pressable>
        <ScrollView
          contentContainerStyle={styles.content}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
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
    paddingTop: theme.spacing[7] * 2,
  },
  message: {
    ...theme.shadows.neutral,
    alignSelf: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: '#D9D9D9',
    borderRadius: theme.radii.small,
    borderWidth: 1,
    maxWidth: 480,
    padding: theme.spacing[5],
    width: '100%',
  },
  backButton: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    left: theme.spacing[5],
    position: 'absolute',
    top: theme.spacing[2],
    width: 48,
    zIndex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
