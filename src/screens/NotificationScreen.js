import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { ArrowLeft, Bell, Trash2, Check } from 'lucide-react-native';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';
import { useNavigation } from '@react-navigation/native';
import notifee from '@notifee/react-native';

const { width, height } = Dimensions.get('window');

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'
  const [refreshing, setRefreshing] = useState(false);

  // Initial data load
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Simulate API call
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
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNotifications().then(() => setRefreshing(false));
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

  const getFilterStyle = btnFilter => [
    styles.filterButton,
    filter === btnFilter && { backgroundColor: COLORS.primary },
  ];

  const getFilterTextStyle = btnFilter => [
    styles.filterText,
    filter === btnFilter && { color: '#fff' },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.read && { opacity: 0.6 }]}>
      <View style={styles.iconContainer}>
        <Bell size={width * 0.055} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { fontSize: width * 0.04 }]}>
          {item.title}
        </Text>
        <Text style={[styles.message, { fontSize: width * 0.035 }]}>
          {item.message}
        </Text>
        <Text style={[styles.time, { fontSize: width * 0.03 }]}>
          {item.time}
        </Text>
      </View>
      {!item.read && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => markAsRead(item.id)}
        >
          <Check size={width * 0.045} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Trash2 size={width * 0.045} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={[
          styles.container,
          { paddingHorizontal: width * 0.04, paddingTop: height * 0.04 },
        ]}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={width * 0.06} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.header, { fontSize: width * 0.055 }]}>
            Notifications
          </Text>
          <TouchableOpacity
            style={styles.notifButton}
            onPress={onDisplayNotification}
          >
            <Bell size={width * 0.055} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setFilter('all')}
            style={getFilterStyle('all')}
          >
            <Text style={getFilterTextStyle('all')}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('unread')}
            style={getFilterStyle('unread')}
          >
            <Text style={getFilterTextStyle('unread')}>Unread</Text>
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
            <Bell size={width * 0.12} color={COLORS.textSecondary} />
            <Text style={[styles.emptyText, { fontSize: width * 0.035 }]}>
              No notifications yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredNotifications}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
              />
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
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
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontFamily: FONTS.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  message: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  time: {
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
  actionButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  emptyText: {
    marginTop: 10,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
  },
});
