import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { COLORS, FONTS } from '../styles/globalstyle';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserData(documentSnapshot.data());
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleLogout = () => {
    auth().signOut();
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {userData ? (
        <>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userData.username}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>

          <Text style={styles.label}>Joined:</Text>
          <Text style={styles.value}>
            {new Date(userData.createdAt).toDateString()}
          </Text>
        </>
      ) : (
        <Text>No user data found.</Text>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.background },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontFamily: FONTS.extraBold,
    marginBottom: 20,
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginTop: 10,
    color: COLORS.textSecondary,
  },
  value: { fontSize: 16, fontFamily: FONTS.regular, color: COLORS.textPrimary },
  logoutButton: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontFamily: FONTS.bold },
});
