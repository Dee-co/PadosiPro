import React from 'react';
import {Text} from 'react-native';

import {colors, fonts} from '../../theme';

const AppText = ({
  children,
  variant = 'body',
  color = colors.textPrimary,
  style,
  ...props
}) => {
  const variants = {
    heading: {
      fontFamily: fonts.bold,
      fontSize: 32,
      lineHeight: 40,
    },

    subHeading: {
      fontFamily: fonts.semiBold,
      fontSize: 24,
      lineHeight: 32,
    },

    title: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
      lineHeight: 26,
    },

    body: {
      fontFamily: fonts.regular,
      fontSize: 16,
      lineHeight: 24,
    },

    bodySmall: {
      fontFamily: fonts.regular,
      fontSize: 14,
      lineHeight: 20,
    },

    caption: {
      fontFamily: fonts.light,
      fontSize: 12,
      lineHeight: 18,
    },

    button: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      lineHeight: 22,
    },
  };

  return (
    <Text
      style={[
        {
          color,
        },
        variants[variant],
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;