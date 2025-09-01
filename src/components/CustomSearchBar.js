import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../styles/globalstyle';
import { Search } from 'lucide-react-native';

const CustomSearchBar = ({ onFilterPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Search Box */}
      <TouchableOpacity
        onPress={() => navigation.navigate('SearchScreen')}
        style={styles.searchBox}
        activeOpacity={0.8}
      >
        <Search size={20} color={COLORS.textLight} />
        <Text style={styles.fakeInput}>Search poses, classes...</Text>
      </TouchableOpacity>

    
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  fakeInput: {
    marginLeft: 8,
    fontFamily: FONTS.regular,
    color: COLORS.textLight,
    fontSize: 15,
  },
  filterIcon: {
    backgroundColor: COLORS.primary,
    padding: 11,
    marginLeft: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
});
