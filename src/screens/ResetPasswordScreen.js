import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalstyle';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const user = auth().currentUser;

      if (user) {
        await user.updatePassword(newPassword);
        Alert.alert('Success', 'Your password has been updated successfully');
        navigation.navigate('SignInScreen');
      } else {
        Alert.alert('Error', 'No user found. Please log in again.');
        navigation.navigate('SignInScreen');
      }
    } catch (error) {
      console.error('Reset Password Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text
        style={[
          globalStyles.titleText,
          { textAlign: 'center', fontSize: 28, marginTop: 20 },
        ]}
      >
        Reset Password
      </Text>

      <CustomInput
        placeholder="Enter new password"
        text="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <CustomInput
        placeholder="Confirm new password"
        text="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <CustomButton
        title="Update Password"
        onPress={handleResetPassword}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({});
