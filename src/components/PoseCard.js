import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../styles/globalstyle';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.18; // responsive height

const GRADIENTS = {
  Beginner: ['#34D399', '#BBF7D0'],
  Intermediate: ['#3B82F6', '#93C5FD'],
  Expert: ['#EF4444', '#FCA5A5'],
};

const PoseCard = ({ pose, onPress, style }) => {
  const colors = GRADIENTS[pose.level] || GRADIENTS.Beginner;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.cardWrapper, style]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.overlay} />

        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{pose.english_name}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{pose.level || 'Beginner'}</Text>
            </View>
          </View>

          {pose.image && (
            <Image source={{ uri: pose.image }} style={styles.image} />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PoseCard;

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: width * 0.05, // responsive border radius
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  gradient: {
    flex: 1,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    padding: width * 0.04, // responsive padding
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: width * 0.05,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: width * 0.025, // responsive padding
  },
  title: {
    fontSize: width * 0.045, // responsive font
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: height * 0.008,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: width * 0.025,
    paddingVertical: height * 0.005,
    borderRadius: width * 0.03,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: width * 0.03,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  image: {
    width: width * 0.25, // responsive image width
    height: width * 0.25, // maintain square
    resizeMode: 'contain',
    borderRadius: width * 0.03,
  },
});
