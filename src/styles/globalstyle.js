// globalStyles.js

import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#ffeaffff',
  primary: '#9C6ADE',
  secondary: '#C8A2C8',
  tertiary: '#BFA2DB',
  warning: '#FF9B73',
  textPrimary: '#2F2F2F',
  textSecondary: '#6C757D',
  cardBackground: '#FFFFFF',
  border: '#E4E6E5',
  white: '#ffffff',
  black: '#000000',
};

export const FONTS = {
  regular: 'Nunito-Regular',
  medium: 'Nunito-Medium',
  semiBold: 'Nunito-SemiBold',
  bold: 'Nunito-Bold',
  extrabold: 'Nunito-ExtraBold',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  bodyText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  sliderButton: {
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '90%',
  },
});
