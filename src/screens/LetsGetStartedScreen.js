import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, FONTS } from '../styles/globalstyle';

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
          textStyle={{ color: '#fff', fontFamily: FONTS.extrabold }}
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
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  heading: {
    fontSize: 26,
    color: COLORS.primary,
    fontFamily: FONTS.extrabold,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginBottom: 30,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signInText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  signInLink: {
    color: COLORS.primary,
    fontFamily: FONTS.extrabold,
    textDecorationLine: 'underline',
    marginLeft: 7,
  },
  infoBox: {
    backgroundColor: COLORS.cardBackground,
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignSelf: 'center',
    padding: 20,
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    paddingVertical: 30,
  },
});
