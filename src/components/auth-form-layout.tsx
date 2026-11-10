import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SymbolView } from 'expo-symbols';

import { AppText } from '@/components/app-text';
import { AuthBrandFooter } from '@/components/auth-brand-footer';
import { AuthDecorations } from '@/components/auth-background';
import { Screen } from '@/components/screen';
import { theme } from '@/theme';

type AuthFormLayoutProps = {
  title: string;
  backAccessibilityLabel: string;
  onBack: () => void;
  children: ReactNode;
  developmentAction?: ReactNode;
};

export function AuthFormLayout({
  title,
  backAccessibilityLabel,
  onBack,
  children,
  developmentAction,
}: AuthFormLayoutProps) {
  const { height } = useWindowDimensions();

  return (
    <Screen
      edges={['top', 'bottom']}
      contentContainerStyle={styles.screenContent}
      style={styles.transparentScreen}>
      <View style={styles.page}>
        <AuthDecorations variant="form" />
        <Pressable
          accessibilityLabel={backAccessibilityLabel}
          accessibilityRole="button"
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}>
          <SymbolView
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size={22}
            tintColor={theme.colors.navigation}
          />
        </Pressable>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoiding}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: Math.max(theme.spacing[7] * 2, height * 0.085) },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.contentGroup}>
              <View style={styles.titleCard}>
                <AppText color="textOnDark" style={styles.title} variant="heading2">
                  {title}
                </AppText>
              </View>

              <View style={styles.formCard}>{children}</View>

              {developmentAction}
            </View>
          </ScrollView>
          <AuthBrandFooter />
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
}

export const authFormStyles = StyleSheet.create({
  fields: {
    gap: theme.spacing[5],
  },
  submit: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.navigation,
    marginTop: theme.spacing[1],
  },
  links: {
    alignItems: 'flex-start',
    columnGap: theme.spacing[2],
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  link: {
    flexShrink: 1,
  },
  devSection: {
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    marginTop: theme.spacing[1],
    maxWidth: 480,
    paddingTop: theme.spacing[3],
    width: '100%',
  },
  devButton: {
    alignSelf: 'stretch',
    backgroundColor: theme.colors.navigation,
    minHeight: 40,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
  },
});

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
  keyboardAvoiding: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: theme.spacing[4],
    paddingHorizontal: theme.spacing[5],
  },
  contentGroup: {
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    alignItems: 'center',
    left: theme.spacing[5],
    position: 'absolute',
    top: theme.spacing[2],
    height: 48,
    justifyContent: 'center',
    width: 48,
    zIndex: 1,
  },
  titleCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.navigation,
    borderRadius: theme.radii.medium,
    elevation: 3,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: theme.spacing[4],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    maxWidth: 480,
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    borderColor: '#D9D9D9',
    borderRadius: theme.radii.small,
    borderWidth: 1,
    elevation: 3,
    gap: theme.spacing[5],
    maxWidth: 480,
    marginTop: theme.spacing[8],
    padding: theme.spacing[5],
    shadowColor: theme.colors.overlay,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
  pressed: {
    opacity: 0.7,
  },
});
