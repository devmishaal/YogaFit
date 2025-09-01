import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, FONTS } from '../styles/globalstyle';
import CustomSearchBar from '../components/CustomSearchBar'; // 👈 your themed search bar

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>YogaFit</Text>
      </View>

      {/* Search Bar */}
      <CustomSearchBar onFilterPress={() => console.log('Filter pressed')} />

      {/* Featured Banner */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/young-woman-doing-yoga-nature_23-2149092700.jpg',
          }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextBox}>
          <Text style={styles.bannerTitle}>Morning Yoga Flow</Text>
          <Text style={styles.bannerSubtitle}>
            Start your day with energy 🌞
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => navigation.navigate('ClassDetails')}
          >
            <Text style={styles.bannerButtonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryRow}>
          {['Beginner', 'Strength', 'Flexibility', 'Relax'].map(
            (cat, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>

      {/* Recommended Classes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recommendCard}
              onPress={() => navigation.navigate('ClassDetails')}
            >
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/young-woman-doing-yoga-exercise-home_1150-11152.jpg',
                }}
                style={styles.recommendImage}
              />
              <Text style={styles.recommendText}>Yoga Session {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 10,
  },
  greeting: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
  },
  name: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
  },
  banner: {
    marginVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    opacity: 0.9,
  },
  bannerTextBox: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#fefefe',
    marginVertical: 5,
  },
  bannerButton: {
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  bannerButtonText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: '#fff',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.textDark,
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryText: {
    fontFamily: FONTS.semibold,
    color: COLORS.textDark,
    fontSize: 14,
  },
  recommendCard: {
    marginRight: 15,
    width: 140,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  recommendImage: {
    width: '100%',
    height: 100,
  },
  recommendText: {
    fontSize: 14,
    fontFamily: FONTS.semibold,
    color: COLORS.textDark,
    padding: 8,
  },
});
