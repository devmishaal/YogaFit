import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../styles/globalstyle';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 1,
    title: 'YogaFit - Your Yoga Journey Starts Here',
    text: 'Get ready to embark on a transformative yoga journey with YogaFit. Discover a wide range of Yogas, tailored to your goals.',
    image: require('../assets/images/intro1.png'),
  },
  {
    key: 2,
    title: 'Tailored Exercise Plan For Your Needs',
    text: "YogaFit personalizes yogas just for you. Whether you're a beginner or a yoga enthusiast, our app adapts to your needs.",
    image: require('../assets/images/intro2.png'),
  },
  {
    key: 3,
    title: 'Stay Informed About Your Progress',
    text: "Stay motivated and monitor your progress effortlessly. Start your yoga journey today and achieve the results you've always wanted.",
    image: require('../assets/images/intro3.png'),
  },
];

const AppIntroSliderScreen = () => {
  const navigation = useNavigation();
  const sliderRef = useRef(null);

  const renderItem = ({ item }) => (
    <SafeAreaView style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </SafeAreaView>
  );

  const renderButton = (label, onPress, buttonStyle) => (
    <TouchableOpacity
      style={[styles.buttonContainer, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderPagination = activeIndex => {
    return (
      <View style={styles.paginationContainer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
        <View style={styles.buttonsRow}>
          {activeIndex < slides.length - 1 ? (
            <>
              {renderButton(
                'Skip',
                () => navigation.replace('LetsGetStartedScreen'),
                styles.skipButton,
              )}
              {renderButton(
                'Next',
                () => sliderRef.current.goToSlide(activeIndex + 1),
                styles.nextButton,
              )}
            </>
          ) : (
            renderButton(
              'Get Started',
              () => navigation.replace('LetsGetStartedScreen'),
              styles.getStartedButton,
            )
          )}
        </View>
      </View>
    );
  };

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      renderPagination={renderPagination}
      bottomButton={false}
      containerStyle={styles.sliderContainer}
    />
  );
};

export default AppIntroSliderScreen;

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.background,
  },
  image: {
    width: width * 0.9,
    height: width * 0.6,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontFamily: FONTS.extraBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  paginationContainer: {
    paddingBottom: 30,
    backgroundColor: COLORS.background,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 20,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dot: {
    backgroundColor: '#d1d1d1',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingVertical: height * 0.018,
    borderRadius: width * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  skipButton: {
    backgroundColor: COLORS.secondary,
    width: '48%',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    width: '48%',
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
  },
});
