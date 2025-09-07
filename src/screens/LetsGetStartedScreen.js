import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONTS } from '../styles/globalstyle';

const { width, height } = Dimensions.get('window');

const LetsGetStartedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/1.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.infoBox}>
        <Text style={styles.heading}>YogaFit - Begin Your Yoga Journey</Text>

        <Text style={styles.description}>
          Explore personalized yoga routines designed to fit your lifestyle,
          track your progress over time, and effortlessly boost your health with
          YogaFit. Stay motivated with guided sessions.
        </Text>

        <CustomButton
          title="Let's Get Started"
          onPress={() => navigation.navigate('SignUpScreen')}
          icon={true}
          buttonStyle={{ backgroundColor: COLORS.primary }}
          textStyle={{ color: '#fff', fontFamily: FONTS.extraBold }}
        />

        <View style={styles.signInRow}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LetsGetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width,
    height: height * 0.6,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  heading: {
    fontSize: width * 0.07, // scales with screen width
    color: COLORS.primary,
    fontFamily: FONTS.extraBold,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  description: {
    fontSize: width * 0.04, // scales with screen width
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginBottom: height * 0.03,
    lineHeight: width * 0.06,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height * 0.015,
  },
  signInText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: width * 0.035,
  },
  signInLink: {
    color: COLORS.primary,
    fontFamily: FONTS.extraBold,
    textDecorationLine: 'underline',
    marginLeft: width * 0.02,
    fontSize: width * 0.035,
  },
  infoBox: {
    backgroundColor: COLORS.cardBackground,
    width: '100%',
    minHeight: height * 0.45, // responsive height
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
  },
});
