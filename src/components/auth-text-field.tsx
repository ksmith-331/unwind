import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText, manropeFontFamilies } from '@/components/app-text';
import { theme } from '@/theme';

type AuthTextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  secureTextEntry?: boolean;
  error?: string;
};

export function AuthTextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  autoComplete,
  textContentType,
  secureTextEntry = false,
  error,
}: AuthTextFieldProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label} variant="body">
        {label}
      </AppText>
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={error}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#66777C"
        secureTextEntry={secureTextEntry}
        style={[styles.input, error && styles.inputError]}
        textContentType={textContentType}
        value={value}
      />
      {error ? (
        <AppText color="primaryAction" style={styles.error} variant="caption">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: theme.spacing[2],
  },
  label: {
    color: theme.colors.primaryText,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: '#D9D9D9',
    borderRadius: theme.radii.small,
    borderWidth: 1,
    color: theme.colors.primaryText,
    fontFamily: manropeFontFamilies.regular,
    fontSize: theme.typography.body.fontSize,
    minHeight: 48,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
  },
  inputError: {
    borderColor: theme.colors.primaryAction,
  },
  error: {
    marginTop: -theme.spacing[1],
  },
});
