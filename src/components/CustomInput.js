import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONTS } from '../styles/globalstyle';

const CustomInput = ({
  placeholder,
  placeholderTextColor = COLORS.textSecondary,
  keyboardType,
  text,
  value,
  onChangeText,
  secureTextEntry,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.label]}>{text}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size={20} color={COLORS.textSecondary} />
            ) : (
              <EyeOff size={20} color={COLORS.textSecondary} />
            )}
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
