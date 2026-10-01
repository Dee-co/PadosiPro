import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  View,
} from 'react-native';

import AppText from './AppText';
import {colors, fonts} from '../../theme';

const AppSelect = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  disabled = false,
  leftIcon,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find(
    option => option.value === value,
  );

  const handleSelect = option => {
    onChange?.(option.value);
    setVisible(false);
  };

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

      {/* Select */}
      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
        style={({pressed}) => ({
          minHeight: 52,
          borderWidth: 1,
          borderColor: error
            ? colors.error
            : colors.border,
          borderRadius: 12,
          backgroundColor: colors.surface,
          paddingHorizontal: 14,

          flexDirection: 'row',
          alignItems: 'center',

          opacity: disabled
            ? 0.5
            : pressed
            ? 0.8
            : 1,
        })}>
        
        {/* Left Icon */}
        {leftIcon && (
          <View style={{marginRight: 10}}>
            {leftIcon}
          </View>
        )}

        {/* Selected Value */}
        <View style={{flex: 1}}>
          <AppText
            variant="body"
            color={
              selectedOption
                ? colors.textPrimary
                : colors.textMuted
            }>
            {selectedOption
              ? selectedOption.label
              : placeholder}
          </AppText>
        </View>

        {/* Arrow */}
        <AppText
          style={{
            fontSize: 18,
            fontFamily: fonts.semiBold,
          }}>
          ⌄
        </AppText>
      </Pressable>

      {/* Error */}
      {error && (
        <AppText
          variant="caption"
          color={colors.error}
          style={{marginTop: 6}}>
          {error}
        </AppText>
      )}

      {/* Options Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.65)',
          }}>
          
          {/* Close area */}
          <Pressable
            style={{flex: 1}}
            onPress={() => setVisible(false)}
          />

          {/* Bottom Sheet */}
          <View
            style={{
              maxHeight: '70%',
              backgroundColor: colors.surface,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
            }}>
            
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <AppText variant="title">
                {label || 'Select'}
              </AppText>

              <Pressable
                onPress={() => setVisible(false)}
                hitSlop={10}>
                <AppText
                  style={{
                    fontSize: 24,
                    color: colors.textSecondary,
                  }}>
                  ×
                </AppText>
              </Pressable>
            </View>

            {/* Options */}
            <ScrollView
              showsVerticalScrollIndicator={false}>
              {options.map(option => {
                const selected =
                  option.value === value;

                return (
                  <Pressable
                    key={String(option.value)}
                    onPress={() =>
                      handleSelect(option)
                    }
                    style={{
                      minHeight: 50,
                      paddingHorizontal: 14,
                      borderRadius: 10,
                      marginBottom: 8,

                      backgroundColor: selected
                        ? colors.borderPrimary
                        : colors.surfaceLight,

                      justifyContent: 'center',
                    }}>
                    <AppText
                      color={
                        selected
                          ? colors.primary
                          : colors.textPrimary
                      }
                      style={{
                        fontFamily: selected
                          ? fonts.semiBold
                          : fonts.regular,
                      }}>
                      {option.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppSelect;