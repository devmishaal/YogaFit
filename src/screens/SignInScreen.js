import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import { COLORS, globalStyles } from '../styles/globalstyle';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '148917854976-ul8t50ti31pml63u81dsjhv1tepbcbo7.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      console.log(signInResult);
      // Try the new style of google-sign in result, from v13+ of that module
      let idToken = signInResult.data?.idToken || signInResult.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      console.error(error);
      Alert.alert('Google Sign-In failed', error.message);
    }
  };

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
            <View
              style={{
                paddingTop: 20,
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
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
                  isPassword={true}
                  style={{ marginTop: 12 }}
                />
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', marginTop: 8 }}
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
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
            </View>
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
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={onGoogleButtonPress}
                >
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
                  Don't have an account?
                </Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
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
