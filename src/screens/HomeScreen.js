import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import YogaGlassCard from '../components/YogaGlassCard';
import { CARD_GRADIENTS } from '../utils/gradients';
import { getAllCategories } from '../utils/webhandler';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        const categoriesWithImages = data.map(cat => ({
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          if (userDoc.exists) {
            setUsername(userDoc.data().username || 'Yogi');
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={{ paddingHorizontal: width * 0.04, paddingTop: height * 0.02 }}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              marginBottom: height * 0.02,
              paddingTop: height * 0.02,
              paddingHorizontal: width * 0.01,
            },
          ]}
        >
          <View>
            <Text style={[styles.welcomeText, { fontSize: width * 0.05 }]}>
              Hello, {username} 👋
            </Text>
            <Text
              style={[
                styles.subText,
                { fontSize: width * 0.035, marginTop: height * 0.005 },
              ]}
            >
              Ready for your yoga practice today?
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.bellContainer, { padding: width * 0.02 }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Bell size={width * 0.06} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: height * 0.2 }}
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
                  style={{ marginBottom: height * 0.02 }}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  subText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  bellContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
});
