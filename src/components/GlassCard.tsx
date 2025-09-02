// YogaGlassCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

type Props = {
  title: string;
  subtitle: string;
  style?: ViewStyle;
  gradient: string[];   
  corner?: number;
};

export default function YogaGlassCard({
  title,
  subtitle,
  style,
  gradient,
  corner = 24,
}: Props) {
  return (
    <View style={[styles.wrapper, { borderRadius: corner }, style]}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: corner }]}
      />

      {Platform.OS === 'ios' ? (
        <BlurView
          style={[StyleSheet.absoluteFill, { borderRadius: corner }]}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="rgba(255,255,255,0.15)"
        />
      ) : (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: corner },
          ]}
        />
      )}

      <LinearGradient
        colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gloss,
          { borderRadius: corner * 1.5, transform: [{ rotate: '-18deg' }] },
        ]}
      />

      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: corner,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.25)',
          },
        ]}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    padding: 16,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    backgroundColor: '#ffffff05',
    marginBottom: 16,
  },
  content: {
    minHeight: 120,
    justifyContent: 'center',
  },
  gloss: {
    position: 'absolute',
    width: '160%',
    height: 100,
    top: -30,
    left: -40,
    opacity: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
  },
});
