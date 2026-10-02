import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';
const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
  },
};
const RootNavigator = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  const isProfileCompleted = !!user?.isProfileCompleted;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer theme={navTheme}>
        {!isAuthenticated ? (
          <AuthNavigator key="auth" mode="auth" />
        ) : !isProfileCompleted ? (
          <AuthNavigator key="onboarding" mode="onboarding" />
        ) : (
          <MainNavigator key="main" />
        )}
      </NavigationContainer>
    </View>
  );
};
export default RootNavigator;