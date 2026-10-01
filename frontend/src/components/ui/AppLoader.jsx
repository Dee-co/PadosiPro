import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {colors} from '../../theme';

const AppLoader = ({
  size = 'large',
  color = colors.primary,
  fullScreen = false,
  style,
}) => {
  if (fullScreen) {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.background,
          },
          style,
        ]}>
        <ActivityIndicator
          size={size}
          color={color}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        },
        style,
      ]}>
      <ActivityIndicator
        size={size}
        color={color}
      />
    </View>
  );
};

export default AppLoader;