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
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { ArrowLeft } from 'lucide-react-native';
import { getPosebyId } from '../utils/webhandler';
import CustomButton from '../components/CustomButton';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const PoseDetailsScreen = ({ route, navigation }) => {
  const { pose } = route.params;

  const [poses, setPoses] = useState({});
  const [loading, setLoading] = useState(true);

  const [timer, setTimer] = useState(0);
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

  useEffect(() => {
    let interval = null;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const startPractice = () => {
    setTimer(30);
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
    <SafeAreaView style={globalStyles.container}>
      <View style={{ flex: 1, paddingBottom: height * 0.001 }}>
        <View
          style={{
            paddingTop: height * 0.02,
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

          {/* Pose Image */}
          {poses.url_png && (
            <Image
              source={{ uri: poses.url_png }}
              style={[styles.poseImage, { height: height * 0.3 }]}
            />
          )}
        </View>
        <ScrollView>
          {/* Pose Details */}
          <View
            style={[
              styles.cardContainer,
              {
                marginTop: height * 0.02,
                paddingHorizontal: width * 0.05,
                paddingVertical: height * 0.02,
                marginBottom: height * 0.1,
              },
            ]}
          >
            <Text style={[styles.poseTitle, { fontSize: width * 0.06 }]}>
              {poses.english_name}
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                { fontSize: width * 0.045, marginTop: height * 0.02 },
              ]}
            >
              Benefits:
            </Text>
            <Text
              style={[
                styles.sectionText,
                { fontSize: width * 0.038, lineHeight: height * 0.03 },
              ]}
            >
              {poses.pose_benefits || 'Benefits not available.'}
            </Text>

            <Text
              style={[
                styles.sectionTitle,
                { fontSize: width * 0.045, marginTop: height * 0.02 },
              ]}
            >
              Description:
            </Text>
            <Text
              style={[
                styles.sectionText,
                { fontSize: width * 0.038, lineHeight: height * 0.03 },
              ]}
            >
              {poses.pose_description || 'Description not available.'}
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* Start Practice Button */}
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.001,
          width: '100%',
          backgroundColor: COLORS.background,
          paddingVertical: height * 0.02,
          paddingHorizontal: width * 0.03,
          zIndex: 10,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <CustomButton
          title={'Start Practice'}
          onPress={startPractice}
          style={{
            paddingVertical: height * 0.02,
            marginHorizontal: width * 0.03,
            borderRadius: width * 0.035,
          }}
          textStyle={{ fontSize: width * 0.045 }}
        />
      </View>

      {/* Modal Timer */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelTimer}
      >
        <View style={styles.modalOverlay}>
          {isRunning ? (
            <View
              style={[
                styles.modalContainer,
                { width: width * 0.8, padding: width * 0.05 },
              ]}
            >
              <Text style={[styles.modalTitle, { fontSize: width * 0.05 }]}>
                Yoga Timer
              </Text>
              <Text style={[styles.timerText, { fontSize: width * 0.12 }]}>
                {timer}s
              </Text>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: COLORS.secondary },
                  ]}
                  onPress={cancelTimer}
                >
                  <Text
                    style={[styles.modalButtonText, { fontSize: width * 0.04 }]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: COLORS.primary },
                  ]}
                  onPress={stopTimer}
                >
                  <Text
                    style={[styles.modalButtonText, { fontSize: width * 0.04 }]}
                  >
                    Stop
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                borderRadius: 20,
                backgroundColor: COLORS.white,
                padding: width * 0.05,
              }}
            >
              <LottieView
                style={{ height: width * 0.7, width: width * 0.7 }}
                source={require('../assets/animation/congratulation.json')}
                autoPlay
              />
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PoseDetailsScreen;

const styles = StyleSheet.create({
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
  poseImage: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
    borderRadius: 12,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    zIndex: 5,
  },
  poseTitle: {
    fontFamily: FONTS.extraBold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  sectionText: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  timerText: {
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
  },
});
