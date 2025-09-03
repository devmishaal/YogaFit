import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const SignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Fill all fields!');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Email must end with @gmail.com');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
      });

      await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(true));

      Alert.alert('Account Created Successfully!');
      navigation.navigate('SignInScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[globalStyles.container]}>
          <Text
            style={[
              globalStyles.titleText,
              { textAlign: 'center', fontSize: 30, marginTop: 50 },
            ]}
          >
            Create Account
          </Text>
          <Text style={[globalStyles.bodyText, { textAlign: 'center' }]}>
            Fill your information below or register with your social account.
          </Text>

          <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
            <CustomInput
              placeholder={'johndoe'}
              text={'Username'}
              value={username}
              onChangeText={setUserName}
            />
            <CustomInput
              placeholder={'example@gmail.com'}
              text={'Email'}
              keyboardType={'email-address'}
              value={email}
              onChangeText={setEmail}
              style={{ marginTop: 12 }}
            />
            <CustomInput
              placeholder={'**********'}
              text={'Password'}
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              style={{ marginTop: 12 }}
            />

            <CustomButton title={'Sign Up'} onPress={SignUp} />
          </View>

          {/* Social logins */}
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <Text style={[globalStyles.bodyText, { fontSize: 14 }]}>
              Or sign up with
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
              <Text style={globalStyles.bodyText}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    { color: COLORS.primary, marginLeft: 5 },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ marginTop: 12 }}>
              <Text
                style={[
                  globalStyles.bodyText,
                  { textDecorationLine: 'underline' },
                ]}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
});
