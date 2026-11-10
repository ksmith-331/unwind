import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { AuthTextLink } from '@/components/auth-text-link';
import { AuthFormLayout, authFormStyles } from '@/components/auth-form-layout';
import { AuthTextField } from '@/components/auth-text-field';

export default function SignInRoute() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthFormLayout
      backAccessibilityLabel="Back to Welcome"
      developmentAction={<DevelopmentNavigationAction />}
      onBack={() => router.replace('/welcome')}
      title="welcome back">
      <View style={authFormStyles.fields}>
        <AuthTextField
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          textContentType="emailAddress"
          value={email}
        />
        <AuthTextField
          autoComplete="current-password"
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          value={password}
        />
      </View>

      <AppButton
        disabled
        label="Sign In"
        onPress={() => undefined}
        style={authFormStyles.submit}
        textColor="textOnDark"
      />
      <View style={authFormStyles.links}>
        <AuthTextLink
          label="Forgot Password?"
          onPress={() => router.push('/forgot-password')}
          style={authFormStyles.link}
        />
        <AuthTextLink
          label="New to UnWind? Register"
          onPress={() => router.push('/register')}
          style={authFormStyles.link}
        />
      </View>
    </AuthFormLayout>
  );
}

function DevelopmentNavigationAction() {
  if (!__DEV__) {
    return null;
  }

  return (
    <View style={authFormStyles.devSection}>
      <AppButton
        label="DEV: Continue to authenticated app"
        onPress={() => router.replace('/landing')}
        style={authFormStyles.devButton}
        textColor="textOnDark"
        textVariant="caption"
        variant="secondary"
      />
    </View>
  );
}
