import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Pressable,
  Image,
} from 'react-native';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import { fonts } from '../../theme';
import { useTheme } from '../../context/ThemeContext';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import Toast from 'react-native-toast-message';
import PadosiProLogo from '../../assets/images/padosipro-logo.png';
const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    general: '',
  });
  const handleLogin = async () => {
    setError({
      email: '',
      password: '',
      general: '',
    });
    const trimmedEmail = email.trim();
    const newError = {
      email: '',
      password: '',
      general: '',
    };
    if (!trimmedEmail) {
      newError.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      newError.email = 'Please enter a valid email.';
    }
    if (!password) {
      newError.password = 'Password is required.';
    }
    if (newError.email || newError.password) {
      setError(newError);
      return;
    }
    try {
      setLoading(true);
      const response = await loginUser({
        email: trimmedEmail,
        password,
      });
      console.log('LOGIN RESPONSE:', response);
      await login({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back to PadosiPro',
      });
    } catch (err) {
      console.log('LOGIN ERROR:', err?.response?.data || err?.message);
      const responseData = err?.response?.data;
      const message =
        responseData?.message ||
        'Unable to login. Please check your credentials.';
      const code = responseData?.code;
      if (code === 'EMAIL_NOT_VERIFIED') {
        navigation.navigate('VerifyOtp', {
          email: trimmedEmail,
        });
        return;
      }
      setError({
        email: '',
        password: '',
        general: message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <AppSafeAreaView>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow px-6"
        >
          <View className="flex-1 justify-center py-10">
            <View className="items-center mb-7">
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 22,
                  borderWidth: 2,
                  borderColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}
              >
                <Image
                  source={PadosiProLogo}
                  style={{
                    width: 46,
                    height: 46,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <AppText variant="heading" className="text-center">
                Welcome back
              </AppText>
              <AppText
                variant="body"
                color={colors.textSecondary}
                className="text-center mt-2"
              >
                Login to continue with PadosiPro
              </AppText>
            </View>
            <View className="bg-background rounded-[20px] border border-border p-5">
              <AppInput
                label="Email"
                type="email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (error.email || error.general) {
                    setError(prev => ({
                      ...prev,
                      email: '',
                      general: '',
                    }));
                  }
                }}
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                error={error.email}
                leftIcon={
                  <Mail
                    size={20}
                    color={error.email ? colors.error : colors.textSecondary}
                  />
                }
              />
              <AppInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (error.password || error.general) {
                    setError(prev => ({
                      ...prev,
                      password: '',
                      general: '',
                    }));
                  }
                }}
                placeholder="Enter your password"
                autoCapitalize="none"
                autoCorrect={false}
                error={error.password}
                leftIcon={
                  <Lock
                    size={20}
                    color={error.password ? colors.error : colors.textSecondary}
                  />
                }
                rightIcon={
                  <Eye
                    size={20}
                    color={showPassword ? colors.primary : colors.textSecondary}
                  />
                }
                onRightIconPress={() => setShowPassword(prev => !prev)}
              />
              {error.general ? (
                <AppText
                  variant="caption"
                  color={colors.error}
                  style={{
                    marginTop: -8,
                    marginBottom: 12,
                  }}
                >
                  {error.general}
                </AppText>
              ) : null}
              <AppButton
                title={loading ? 'Logging in...' : 'Login'}
                rightIcon={
                  <ArrowRight
                    size={20}
                    color={colors.black}
                    strokeWidth={2.5}
                  />
                }
                className='mt-2'
                disabled={loading}
                onPress={handleLogin}
              />
            </View>
            <View className="flex-row justify-center items-center mt-7">
              <AppText variant="bodySmall" color={colors.textSecondary}>
                Don't have an account?
              </AppText>
              <Pressable
                onPress={() => navigation.navigate('Register')}
                hitSlop={8}
              >
                <AppText
                  variant="bodySmall"
                  color={colors.primary}
                  style={{
                    fontFamily: fonts.semiBold,
                  }}
                >
                  Create account
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default LoginScreen;
