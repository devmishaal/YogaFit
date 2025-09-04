import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS } from '../styles/globalstyle';

const YogaGlassCard = ({
  title,
  subtitle,
  gradient,
  onPress,
  style,
  image,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={5}>
              {subtitle}
            </Text>
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default YogaGlassCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    marginBottom: 15,
  },
  gradient: {
    borderRadius: 20,
    padding: 20,
    height: 170,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: '#fff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: '#f0f0f0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
});
