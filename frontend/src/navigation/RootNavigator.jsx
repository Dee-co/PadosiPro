import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
const RootNavigator = () => {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;