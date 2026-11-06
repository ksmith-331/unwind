import { router } from 'expo-router';
import Constants from 'expo-constants';
import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppBackHeader } from '@/components/app-back-header';
import { AppText } from '@/components/app-text';
import { SettingsRow } from '@/components/settings-row';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { theme } from '@/theme';

const DEVELOPMENT_APP_VERSION = '1.0.0';
// The development fallback matches the versions in app.json and package.json.
const APP_VERSION = Constants.expoConfig?.version ?? DEVELOPMENT_APP_VERSION;

type NotificationPreferences = {
  projectTutorialReminders: boolean;
  communityActivity: boolean;
  appUpdates: boolean;
};

function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <AppText color="navigation" style={styles.sectionTitle} variant="bodySmallStrong">
        {title}
      </AppText>
      <View style={styles.rows}>{children}</View>
    </View>
  );
}

export default function ProfileSettingsRoute() {
  const reducedMotionEnabled = useReducedMotion();
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>({
      projectTutorialReminders: true,
      communityActivity: true,
      appUpdates: false,
    });

  const updatePreference = (key: keyof NotificationPreferences, value: boolean) => {
    setNotificationPreferences((current) => ({ ...current, [key]: value }));
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <AppBackHeader title="Settings" onBack={() => router.dismissTo('/profile')} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <SettingsSection title="Account">
          <SettingsRow
            detail="Username, email, profile photo"
            label="Profile"
            showSeparator
            trailing={{ type: 'chevron' }}
          />
          <SettingsRow
            detail="Password, multi-factor authentication"
            label="Security"
            showSeparator
            trailing={{ type: 'chevron' }}
          />
          <SettingsRow label="Log Out" trailing={{ type: 'none' }} />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsRow
            label="Project & tutorial reminders"
            showSeparator
            trailing={{
              type: 'switch',
              value: notificationPreferences.projectTutorialReminders,
              onValueChange: (value) => updatePreference('projectTutorialReminders', value),
            }}
          />
          <SettingsRow
            label="Community activity"
            showSeparator
            trailing={{
              type: 'switch',
              value: notificationPreferences.communityActivity,
              onValueChange: (value) => updatePreference('communityActivity', value),
            }}
          />
          <SettingsRow
            label="App updates"
            trailing={{
              type: 'switch',
              value: notificationPreferences.appUpdates,
              onValueChange: (value) => updatePreference('appUpdates', value),
            }}
          />
        </SettingsSection>

        <SettingsSection title="Appearance & Accessibility">
          <SettingsRow
            detail="Uses system setting"
            label="Reduce Motion"
            showSeparator
            trailing={{ type: 'value', value: reducedMotionEnabled ? 'On' : 'Off' }}
          />
          <SettingsRow
            label="Theme"
            trailing={{ type: 'value', value: 'System' }}
          />
        </SettingsSection>

        <SettingsSection title="Privacy & Data">
          <SettingsRow
            label="Privacy settings"
            showSeparator
            trailing={{ type: 'chevron' }}
          />
          <SettingsRow
            label="Cookie use"
            showSeparator
            trailing={{ type: 'chevron' }}
          />
          <SettingsRow
            label="Delete account"
            destructive
            trailing={{ type: 'none' }}
          />
        </SettingsSection>

        <SettingsSection title="About">
          <SettingsRow label="About UnWind" showSeparator trailing={{ type: 'chevron' }} />
          <SettingsRow label="Terms of Service" showSeparator trailing={{ type: 'chevron' }} />
          <SettingsRow label="Privacy Policy" showSeparator trailing={{ type: 'chevron' }} />
          <SettingsRow
            label="Open-source licenses"
            showSeparator
            trailing={{ type: 'chevron' }}
          />
          <SettingsRow
            label="App version"
            trailing={{ type: 'value', value: APP_VERSION }}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.appBackground,
    flex: 1,
  },
  content: {
    gap: theme.spacing[5],
    paddingBottom: theme.spacing[7],
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
  section: {
    gap: theme.spacing[2],
  },
  sectionTitle: {
    paddingHorizontal: theme.spacing[1],
  },
  rows: {
    backgroundColor: theme.colors.surface,
  },
});
