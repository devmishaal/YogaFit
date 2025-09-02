import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { ArrowLeft } from 'lucide-react-native';
import { getPosebyId } from '../utils/webhandler';
import CustomButton from '../components/CustomButton';

const PoseDetailsScreen = ({ route, navigation }) => {
  const { pose } = route.params;

  const [poses, setPoses] = useState({});
  const [loading, setLoading] = useState(true);

  const [timer, setTimer] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchPoses = async () => {
    setLoading(true);
    try {
      const data = await getPosebyId(pose);
      setPoses(data);
    } catch (error) {
      console.error('Error fetching poses:', error);
      setPoses({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoses();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setModalVisible(false);
      Alert.alert('Congratulations!', 'You have completed your yoga pose.');
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startPractice = () => {
    setTimer(30); // 30 seconds duration
    setIsRunning(true);
    setModalVisible(true);
  };

  const cancelTimer = () => {
    setIsRunning(false);
    setTimer(0);
    setModalVisible(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setModalVisible(false);
    Alert.alert('Stopped', 'You stopped the yoga pose early.');
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>

        {poses.url_png && (
          <Image source={{ uri: poses.url_png }} style={styles.poseImage} />
        )}
      </View>
      <ScrollView>
        <View style={styles.cardContainer}>
          <Text style={styles.poseTitle}>{poses.english_name}</Text>

          <Text style={styles.sectionTitle}>Benefits:</Text>
          <Text style={styles.sectionText}>
            {poses.pose_benefits || 'Benefits not available.'}
          </Text>

          <Text style={styles.sectionTitle}>Description:</Text>
          <Text style={styles.sectionText}>
            {poses.pose_description || 'Description not available.'}
          </Text>
        </View>
      </ScrollView>
      {/* Start Button */}
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: COLORS.background,
          borderRadius: 20,
          zIndex: 10,
          paddingVertical: 7,
        }}
      >
        <CustomButton
          title={'Start Practice'}
          onPress={startPractice}
          style={styles.startButton}
          textStyle={styles.startButtonText}
        />
      </View>
      {/* Timer Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelTimer}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Yoga Timer</Text>
            <Text style={styles.timerText}>{timer}s</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: COLORS.secondary },
                ]}
                onPress={cancelTimer}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: COLORS.primary },
                ]}
                onPress={stopTimer}
              >
                <Text style={styles.modalButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
    height: 250,
    resizeMode: 'contain',
    marginTop: 20,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderTopRightRadius: 20,
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    marginTop: 16,
    zIndex: 5,
    marginBottom: 95,
  borderTopLeftRadius: 20,
  },
  poseTitle: {
    fontFamily: FONTS.extraBold,
    fontSize: 24,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
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
    marginVertical: 20,
    marginHorizontal: 10,
  },
  startButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 48,
    fontFamily: FONTS.extraBold,
    color: COLORS.primary,
    marginVertical: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: 16,
  },
});
