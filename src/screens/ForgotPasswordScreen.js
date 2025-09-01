import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalstyle';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      navigation.navigate('PasswordResetVerificationScreen', { email });
    } catch (error) {
      console.error('Forgot Password Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.titleText, { textAlign: 'center', fontSize: 28 , marginTop:20}]}>
        Forgot Password
      </Text>
      <Text style={[globalStyles.bodyText, { textAlign: 'center', marginVertical: 12 }]}>
        Enter your registered email below to receive password reset instructions.
      </Text>

      <CustomInput
        placeholder="example@gmail.com"
        text="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <CustomButton
        title="Send Reset Link"
        onPress={handleResetPassword}
        style={{ marginTop: 20 }}
      />

      <TouchableOpacity
        style={{ marginTop: 20, alignItems: 'center' }}
        onPress={() => navigation.navigate('SignInScreen')}
      >
        <Text style={[globalStyles.bodyText, { color: COLORS.primary }]}>
          Back to Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
