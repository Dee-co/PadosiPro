import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme';
const AppSafeAreaView = ({
  children,
  style,
  edges = ['top', 'right', 'bottom', 'left'],
  ...props
}) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
        style,
      ]}
      {...props}>
      {children}
    </SafeAreaView>
  );
};

export default AppSafeAreaView;