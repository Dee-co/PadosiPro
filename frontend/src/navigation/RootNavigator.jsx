import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

const RootNavigator = () => {
  const {isAuthenticated, isLoading, user} = useAuth();
  const {colors, isDark} = useTheme();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.border,
      primary: colors.primary,
    },
  };

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: colors.background,
        }}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  const isProfileCompleted = !!user?.isProfileCompleted;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <NavigationContainer theme={navTheme}>
        {!isAuthenticated ? (
          <AuthNavigator
            key="auth"
            mode="auth"
          />
        ) : !isProfileCompleted ? (
          <AuthNavigator
            key="onboarding"
            mode="onboarding"
          />
        ) : (
          <MainNavigator key="main" />
        )}
      </NavigationContainer>
    </View>
  );
};

export default RootNavigator;