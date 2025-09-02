import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import PoseDetailsScreen from '../screens/PoseDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
      />
      <Stack.Screen name="PoseDetailsScreen" component={PoseDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
