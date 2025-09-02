import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import YogaGlassCard from '../components/YogaGlassCard';
import { getCategoryById } from '../utils/webhandler';
import { ArrowLeft } from 'lucide-react-native';
import PoseCard from '../components/PoseCard';

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
    <ScrollView style={globalStyles.container}>
      <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {/* Category Image */}
        {category.image && (
          <Image
            source={{ uri: category.image }}
            style={styles.categoryImage}
          />
        )}
      </View>

      <View style={styles.info}>
        {/* Title & Description */}
        <View style={{ padding: 16 }}>
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
            style={{ marginTop: 20 }}
          />
        ) : poses.length > 0 ? (
          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            {poses.map(pose => (
              <PoseCard
                key={pose.id}
                pose={{
                  ...pose,
                  image: pose.url_png,
                  level: pose.difficulty_level,
                }}
                onPress={() =>
                  navigation.navigate('PoseDetailsScreen', { pose : pose.id })
                }
              />
            ))}
          </View>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: COLORS.textSecondary,
              fontFamily: FONTS.regular,
            }}
          >
            No poses found for {selectedDifficulty} level.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  categoryImage: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 22,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: COLORS.cardBackground,
    padding: 6,
    borderRadius: 20,
    elevation: 5,
  },
  info: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    elevation: 5,
    paddingBottom: 20,
    shadowColor: '#000',
    padding: 10,
  },
});
