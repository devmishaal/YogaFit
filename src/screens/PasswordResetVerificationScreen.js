import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, globalStyles } from '../styles/globalstyle';

const PasswordResetVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};

  return (
    <View style={globalStyles.container}>
      <Text
        style={[
          globalStyles.titleText,
          { textAlign: 'center', fontSize: 28, marginTop: 20 },
        ]}
      >
        Check Your Email
      </Text>
      <Text
        style={[
          globalStyles.bodyText,
          { textAlign: 'center', marginVertical: 12 },
        ]}
      >
        We sent a password reset link to:
      </Text>
      <Text
        style={[
          globalStyles.bodyText,
          { textAlign: 'center', fontWeight: 'bold', color: COLORS.primary },
        ]}
      >
        {email}
      </Text>

      <Text
        style={[
          globalStyles.bodyText,
          { textAlign: 'center', marginTop: 20, color: COLORS.gray },
        ]}
      >
        Open your inbox and follow the link to reset your password.
      </Text>

      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={styles.buttonText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordResetVerificationScreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
