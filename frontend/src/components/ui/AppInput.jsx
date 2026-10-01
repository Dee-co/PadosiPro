import React from 'react';
import {TextInput, View, Pressable} from 'react-native';

import AppText from './AppText';
import {colors, fonts} from '../../theme';

const AppInput = ({
  label,
  error,
  variant = 'default',
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  value,
  onChangeText,
  type = 'text',
  keyboardType,
  ...props
}) => {
  const isFilled = variant === 'filled';

  const getKeyboardType = () => {
    if (keyboardType) {
      return keyboardType;
    }

    switch (type) {
      case 'email':
        return 'email-address';

      case 'number':
        return 'numeric';

      case 'phone':
        return 'phone-pad';

      default:
        return 'default';
    }
  };

  const isPassword = type === 'password';

  return (
    <View style={{marginBottom: 16}}>
      {/* Label */}
      {label && (
        <AppText
          variant="bodySmall"
          style={{
            fontFamily: fonts.semiBold,
            marginBottom: 8,
          }}>
          {label}
        </AppText>
      )}

      {/* Input Container */}
      <View
        style={{
          minHeight: 52,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: 12,
          backgroundColor: isFilled
            ? colors.surfaceLight
            : colors.surface,
          paddingHorizontal: 14,
        }}>
        
        {/* Left Icon */}
        {leftIcon && (
          <Pressable
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            hitSlop={10}
            style={{
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {leftIcon}
          </Pressable>
        )}

        {/* Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={isPassword}
          placeholderTextColor={colors.textMuted}
          style={{
            flex: 1,
            color: colors.textPrimary,
            fontFamily: fonts.regular,
            fontSize: 16,
            paddingVertical: 0,
          }}
          {...props}
        />

        {/* Right Icon */}
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={10}
            style={{
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {rightIcon}
          </Pressable>
        )}
      </View>

      {/* Error */}
      {error && (
        <AppText
          variant="caption"
          color={colors.error}
          style={{
            marginTop: 6,
          }}>
          {error}
        </AppText>
      )}
    </View>
  );
};

export default AppInput;