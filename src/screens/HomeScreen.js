import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Bell } from 'lucide-react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import YogaGlassCard from '../components/YogaGlassCard';
import { CARD_GRADIENTS } from '../utils/gradients';
import { getAllCategories } from '../utils/webhandler';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const categoriesWithImages = data.map((cat) => ({
          ...cat,
          image:
            cat.poses && cat.poses.length > 0
              ? cat.poses[0].url_png
              : 'https://via.placeholder.com/300x200.png?text=Yoga+Pose',
        }));
        setCategories(categoriesWithImages);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <View
      style={[
        globalStyles.container,
        { paddingTop: 20, paddingHorizontal: 16, paddingVertical: 12 },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, Mishal 👋</Text>
          <Text style={styles.subText}>Ready for your yoga practice today?</Text>
        </View>
        <View style={styles.bellContainer}>
          <Bell size={24} color={COLORS.textPrimary} />
        </View>
      </View>

      {/* Categories */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {categories.map((category, index) => {
            const shortDesc =
              category.category_description?.length > 60
                ? category.category_description.substring(0, 120) + '...'
                : category.category_description;

            return (
              <YogaGlassCard
                key={category.id}
                title={category.category_name}
                subtitle={shortDesc}
                image={category.image}
                gradient={CARD_GRADIENTS[index % CARD_GRADIENTS.length]}
                onPress={() =>
                  navigation.navigate('CategoryDetailScreen', { category })
                }
                style={{ marginBottom: 16 }}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  subText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  bellContainer: {
    padding: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
