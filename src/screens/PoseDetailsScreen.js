import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { ArrowLeft } from 'lucide-react-native';
import { getPosebyId } from '../utils/webhandler';

const PoseDetailsScreen = ({ route, navigation }) => {
  const { pose } = route.params;
  console.log('Pose Data:', pose);

  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPoses = async () => {
    setLoading(true);
    try {
      const data = await getPosebyId(pose);
      console.log(data)
      setPoses(data );
    } catch (error) {
      console.error('Error fetching poses:', error);
      setPoses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoses();
  }, []);
  return (
    <ScrollView style={globalStyles.container}>
     <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color={COLORS.textPrimary} />
      </TouchableOpacity>

      {/* Pose Image */}
      <Image source={{ uri: poses.url_png }} style={styles.poseImage} />
    </View>

      {/* Card Container */ }
  <View style={styles.cardContainer}>
    {/* Pose Name */}
    <Text style={styles.poseTitle}>{poses.english_name}</Text>

    {/* Difficulty */}
    {/* <View style={styles.difficultyBadge}>
      <Text style={styles.difficultyText}>{poses.difficulty_level}</Text>
    </View> */}

    {/* Benefits */}
    <Text style={styles.sectionTitle}>Benefits:</Text>
    <Text style={styles.sectionText}>
      {poses.pose_benefits || 'Benefits not available.'}
    </Text>

    {/* Description */}
        <Text style={styles.sectionTitle}>Description:</Text>
        <Text style={styles.sectionText}>
          {poses.pose_description || 'Description not available.'}
        </Text>

    {/* Start Button */}
    <TouchableOpacity
      style={styles.startButton}
      onPress={() => alert('Start Pose Practice')}
    >
      <Text style={styles.startButtonText}>Start Practice</Text>
    </TouchableOpacity>
  </View> 
    </ScrollView >
  );
};

export default PoseDetailsScreen;

const styles = StyleSheet.create({
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
  poseImage: {
    width: '100%',
    height: 350,
    resizeMode: 'contain',
    marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  poseTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  poseSubTitle: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  difficultyBadge: {
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginVertical: 10,
  },
  difficultyText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 6,
  },
  sectionText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 30,
  },
  startButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#fff',
  },
});
