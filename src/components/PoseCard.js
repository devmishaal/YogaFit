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

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = 130;

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
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginBottom: 6,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tagText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 12,
  },
});
