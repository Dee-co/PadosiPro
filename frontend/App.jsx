import './global.css';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {AuthProvider} from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import AppToast from './src/components/ui/AppToast';
const toastConfig = {
  success: props => <AppToast {...props} type="success" />,
  error: props => <AppToast {...props} type="error" />,
  info: props => <AppToast {...props} type="info" />,
};
const App = () => {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <AuthProvider>
          <RootNavigator />
          <Toast config={toastConfig} />
        </AuthProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
};

export default App;