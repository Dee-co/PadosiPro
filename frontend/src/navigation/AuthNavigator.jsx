import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyOtpScreen from '../screens/auth/VerifyOtpScreen';
import ProfileScreen from '../screens/onboarding/ProfileScreen';
import TaskSelectionScreen from '../screens/onboarding/TaskSelectionScreen';
const Stack = createNativeStackNavigator();
const AuthNavigator = ({ mode = 'auth' }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {mode === 'onboarding' ? (
        <>
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="TaskSelection" component={TaskSelectionScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default AuthNavigator;
