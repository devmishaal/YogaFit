import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ArrowLeft, Bell, Trash2, Check } from 'lucide-react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { useNavigation } from '@react-navigation/native';
import notifee from '@notifee/react-native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          title: 'Daily Yoga Reminder',
          message: 'Don’t forget to practice your 10 min morning yoga today!',
          time: '2h ago',
          read: false,
        },
        {
          id: '2',
          title: 'New Pose Unlocked',
          message: 'You’ve unlocked “Crow Pose” in the Arm Balance category.',
          time: '1d ago',
          read: false,
        },
        {
          id: '3',
          title: 'Congrats 🎉',
          message: 'You completed 7 days of continuous yoga practice!',
          time: '3d ago',
          read: true,
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const markAsRead = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteNotification = id => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications =
    filter === 'all' ? notifications : notifications.filter(n => !n.read);

  const onDisplayNotification = async () => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: 'Daily Yoga Reminder',
      body: 'Time to practice your yoga 🧘',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
      },
    });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.read && { opacity: 0.6 }]}>
      <View style={styles.iconContainer}>
        <Bell size={22} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {!item.read && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => markAsRead(item.id)}>
          <Check size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => deleteNotification(item.id)}>
        <Trash2 size={20} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[globalStyles.container, { padding: 16 }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
        <TouchableOpacity
          style={styles.notifButton}
          onPress={onDisplayNotification}>
          <Bell size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          onPress={() => setFilter('all')}
          style={[
            styles.filterButton,
            filter === 'all' && { backgroundColor: COLORS.primary },
          ]}>
          <Text
            style={[
              styles.filterText,
              filter === 'all' && { color: '#fff' },
            ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilter('unread')}
          style={[
            styles.filterButton,
            filter === 'unread' && { backgroundColor: COLORS.primary },
          ]}>
          <Text
            style={[
              styles.filterText,
              filter === 'unread' && { color: '#fff' },
            ]}>
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : filteredNotifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Bell size={50} color={COLORS.textSecondary} />
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  time: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  header: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.textPrimary,
  },
  notifButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  filterText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  actionButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    elevation: 2,
  },
});
