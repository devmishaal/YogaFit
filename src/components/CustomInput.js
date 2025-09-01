import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { COLORS, FONTS, globalStyles } from '../styles/globalstyle';

const CustomInput = ({
  placeholder,
  placeholderTextColor = COLORS.textSecondary,
  keyboardType,
  text,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.label]}>{text}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: COLORS.cardBackground,
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
