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
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';

const { width, height } = Dimensions.get('window');

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
        <View
          style={[globalStyles.container, { paddingHorizontal: width * 0.04 }]}
        >
          <Text
            style={[
              globalStyles.titleText,
              {
                textAlign: 'center',
                fontSize: width * 0.08,
                marginTop: height * 0.06,
              },
            ]}
          >
            Create Account
          </Text>
          <Text
            style={[
              globalStyles.bodyText,
              { textAlign: 'center', fontSize: width * 0.04 },
            ]}
          >
            Fill your information below or register with your social account.
          </Text>

          <View style={{ paddingVertical: height * 0.02 }}>
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
              style={{ marginTop: height * 0.015 }}
            />
            <CustomInput
              placeholder={'**********'}
              text={'Password'}
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              style={{ marginTop: height * 0.015 }}
            />

            <CustomButton title={'Sign Up'} onPress={SignUp} />
          </View>

          <View style={{ alignItems: 'center', marginTop: height * 0.03 }}>
            <Text style={[globalStyles.bodyText, { fontSize: width * 0.035 }]}>
              Or sign up with
            </Text>
            <View style={{ flexDirection: 'row', marginTop: height * 0.02 }}>
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

            <View style={{ flexDirection: 'row', marginTop: height * 0.025 }}>
              <Text style={globalStyles.bodyText}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignInScreen')}
              >
                <Text
                  style={[
                    globalStyles.bodyText,
                    {
                      color: COLORS.primary,
                      marginLeft: width * 0.02,
                      textDecorationLine: 'underline',
                      fontSize: width * 0.035,
                    },
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ marginTop: height * 0.015 }} onPress={() => navigation.navigate('TermandConditions')}>
              <Text
                style={[
                  globalStyles.bodyText,
                  { textDecorationLine: 'underline', fontSize: width * 0.035 },
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
    height: width * 0.12,
    width: width * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.015,
  },
  icon: {
    width: width * 0.08,
    height: width * 0.08,
  },
});
