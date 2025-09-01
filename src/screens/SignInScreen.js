import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Invalid Email', 'Email must end with @gmail.com');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Invalid Password', 'Password must be at least 8 characters');
      return;
    }

    try {
      await signInWithEmailAndPassword(getAuth(), email, password);

      await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(true));
      Alert.alert('Logged in Successfully!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('SignIn Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ marginTop: '15%' }}>
        <Text
          style={[
            globalStyles.titleText,
            { textAlign: 'center', fontSize: 28 },
          ]}
        >
          Sign In
        </Text>
        <Text
          style={[
            globalStyles.bodyText,
            { textAlign: 'center', marginBottom: 20 },
          ]}
        >
          Welcome back! You've been missed!
        </Text>

        <View style={{ marginBottom: 20 }}>
          <CustomInput
            placeholder={'example@gmail.com'}
            text={'Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            placeholder={'**********'}
            text={'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{ marginTop: 12 }}
          />
          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }} onPress={()=>navigation.navigate('ForgotPasswordScreen')}>
            <Text
              style={[
                globalStyles.bodyText,
                {
                  color: COLORS.primary,
                  textDecorationLine: 'underline',
                  fontSize: 12,
                },
              ]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton title="Sign In" onPress={handleSignIn} />

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <Text style={[globalStyles.bodyText, { fontSize: 13 }]}>
            Or sign in with
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/apple.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/google.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require('../assets/images/fb.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={globalStyles.bodyText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text
                style={[
                  globalStyles.bodyText,
                  { color: COLORS.primary, marginLeft: 5 },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = {
  socialButton: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
};
