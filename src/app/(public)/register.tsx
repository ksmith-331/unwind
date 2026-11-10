import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppButton } from '@/components/app-button';
import { AuthFormLayout, authFormStyles } from '@/components/auth-form-layout';
import { AuthTextField } from '@/components/auth-text-field';
import { AuthTextLink } from '@/components/auth-text-link';

export default function RegisterRoute() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <AuthFormLayout
      backAccessibilityLabel="Back to Welcome"
      onBack={() => router.replace('/welcome')}
      title="create your account">
      <View style={authFormStyles.fields}>
        <AuthTextField
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          textContentType="emailAddress"
          value={email}
        />
        <AuthTextField
          autoComplete="new-password"
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <AuthTextField
          autoComplete="new-password"
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType="newPassword"
          value={confirmPassword}
        />
      </View>

      <AppButton
        disabled
        label="Register"
        onPress={() => undefined}
        style={authFormStyles.submit}
        textColor="textOnDark"
      />
      <AuthTextLink
        label="Already have an account? Sign In"
        onPress={() => router.replace('/sign-in')}
        style={authFormStyles.link}
      />
    </AuthFormLayout>
  );
}
