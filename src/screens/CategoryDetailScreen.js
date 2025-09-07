import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { getCategoryById } from '../utils/webhandler';
import { ArrowLeft } from 'lucide-react-native';
import PoseCard from '../components/PoseCard';

const { width, height } = Dimensions.get('window');
const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Expert'];

const CategoryDetailScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');

  const fetchPoses = async level => {
    setLoading(true);
    try {
      const data = await getCategoryById(category.id, level.toLowerCase());
      setPoses(data.poses || []);
    } catch (error) {
      console.error('Error fetching poses:', error);
      setPoses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoses(selectedDifficulty);
  }, [selectedDifficulty]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1, paddingBottom: height * 0.001 }}>
        <View
          style={{
            paddingTop: height * 0.06,
            paddingHorizontal: width * 0.03,
            paddingVertical: height * 0.01,
          }}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={width * 0.07} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Category Image */}
          {category.image && (
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
            />
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.info}>
            {/* Title & Description */}
            <View
              style={{
                paddingHorizontal: width * 0.04,
                paddingTop: height * 0.015,
              }}
            >
              <Text style={styles.title}>{category.category_name}</Text>
              <Text style={styles.description}>
                {category.category_description}
              </Text>
            </View>

            {/* Difficulty Filters */}
            <View style={styles.filtersContainer}>
              {DIFFICULTY_LEVELS.map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterButton,
                    selectedDifficulty === level && styles.filterButtonActive,
                  ]}
                  onPress={() => setSelectedDifficulty(level)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selectedDifficulty === level && styles.filterTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Poses */}
            {loading ? (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={{ marginTop: height * 0.02 }}
              />
            ) : poses.length > 0 ? (
              <View
                style={{
                  paddingHorizontal: width * 0.04,
                  paddingBottom: height * 0.02,
                }}
              >
                {poses.map(pose => (
                  <PoseCard
                    key={pose.id}
                    pose={{
                      ...pose,
                      image: pose.url_png,
                      level: pose.difficulty_level,
                    }}
                    onPress={() =>
                      navigation.navigate('PoseDetailsScreen', {
                        pose: pose.id,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: height * 0.02,
                  color: COLORS.textSecondary,
                  fontFamily: FONTS.regular,
                  fontSize: width * 0.04,
                  marginBottom: height * 0.218,
                }}
              >
                No poses found for {selectedDifficulty} level.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  categoryImage: {
    width: '100%',
    height: height * 0.3,
    resizeMode: 'contain',
    marginTop: height * 0.015,
    borderRadius: width * 0.03,
  },
  title: {
    fontSize: width * 0.055,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: width * 0.038,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: height * 0.005,
    lineHeight: height * 0.03,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
    paddingHorizontal: width * 0.02,
  },
  filterButton: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.05,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: width * 0.038,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.04,
    left: width * 0.06,
    zIndex: 10,
    backgroundColor: COLORS.cardBackground,
    padding: width * 0.015,
    borderRadius: width * 0.05,
    elevation: 5,
  },
  info: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: width * 0.05,
    elevation: 5,
    marginTop: height * 0.02,
    paddingBottom: height * 0.02,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.02,
  },
});
