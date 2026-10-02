import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
const AppSafeAreaView = ({
  children,
  top = true,
  right = true,
  bottom = true,
  left = true,
  className = '',
  style,
}) => {
  const edges = [
    ...(top ? ['top'] : []),
    ...(right ? ['right'] : []),
    ...(bottom ? ['bottom'] : []),
    ...(left ? ['left'] : []),
  ];
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <SafeAreaView
        edges={edges}
        className={`flex-1 ${className}`}
        style={[
          {
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default AppSafeAreaView;
