import React from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';

import AppText from './AppText';
import {colors} from '../../theme';

const AppButton = ({
  title,
  onPress,
  variant = 'filled',

  loading = false,
  disabled = false,

  leftIcon,
  rightIcon,

  icon,

  fullWidth = true,

  size = 'md',

  style,
  textStyle,

  ...props
}) => {
  const isFilled = variant === 'filled';
  const isOutline = variant === 'outline';
  const isIcon = variant === 'icon';

  const isDisabled = disabled || loading;

  const buttonSize = {
    sm: {
      minHeight: 40,
      paddingHorizontal: 14,
      borderRadius: 10,
    },

    md: {
      minHeight: 52,
      paddingHorizontal: 20,
      borderRadius: 12,
    },

    lg: {
      minHeight: 58,
      paddingHorizontal: 24,
      borderRadius: 14,
    },
  };

  // -----------------------------
  // Icon Only Button
  // -----------------------------

  if (isIcon) {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        style={({pressed}) => [
          {
            width: size === 'sm' ? 40 : size === 'lg' ? 58 : 48,
            height: size === 'sm' ? 40 : size === 'lg' ? 58 : 48,
            borderRadius: 12,

            alignItems: 'center',
            justifyContent: 'center',

            backgroundColor: colors.surface,

            borderWidth: 1,
            borderColor: colors.border,

            opacity: isDisabled
              ? 0.5
              : pressed
              ? 0.75
              : 1,
          },
          style,
        ]}
        {...props}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
        ) : (
          icon
        )}
      </Pressable>
    );
  }

  // -----------------------------
  // Filled / Outline Button
  // -----------------------------

  const backgroundColor = isFilled
    ? colors.primary
    : colors.transparent;

  const borderColor = isOutline
    ? colors.primary
    : colors.primary;

  const textColor = isFilled
    ? colors.black
    : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => [
        {
          ...buttonSize[size],

          borderWidth: 1,
          borderColor,

          backgroundColor,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',

          opacity: isDisabled
            ? 0.5
            : pressed
            ? 0.85
            : 1,

          alignSelf: fullWidth
            ? 'stretch'
            : 'flex-start',
        },
        style,
      ]}
      {...props}>

      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : (
        <>
          {leftIcon && (
            <View style={{marginRight: 8}}>
              {leftIcon}
            </View>
          )}

          <AppText
            variant="button"
            color={textColor}
            style={textStyle}>
            {title}
          </AppText>

          {rightIcon && (
            <View style={{marginLeft: 8}}>
              {rightIcon}
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

export default AppButton;