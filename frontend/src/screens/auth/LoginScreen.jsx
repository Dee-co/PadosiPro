import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Pressable,
} from 'react-native';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react-native';

import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import { colors, fonts } from '../../theme';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
            {/* Logo */}
            <View className="items-center mb-7">
              <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center mb-5">
                <AppText
                  variant="heading"
                  color={colors.black}
                  style={{
                    fontSize: 28,
                    lineHeight: 34,
                  }}
                >
                  P
                </AppText>
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
                onChangeText={setEmail}
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail size={20} color={colors.textSecondary} />}
              />
              <AppInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Lock size={20} color={colors.textSecondary} />}
                rightIcon={
                  <Eye
                    size={20}
                    color={showPassword ? colors.primary : colors.textSecondary}
                  />
                }
                onRightIconPress={() => setShowPassword(prev => !prev)}
              />
              {/* Forgot Password */}
              <Pressable
                onPress={() => console.log('Forgot password')}
                hitSlop={8}
                className="self-end -mt-1 mb-5"
              >
                <AppText
                  variant="bodySmall"
                  color={colors.primary}
                  style={{
                    fontFamily: fonts.semiBold,
                  }}
                >
                  Forgot password?
                </AppText>
              </Pressable>
              <AppButton
                title="Login"
                rightIcon={
                  <ArrowRight
                    size={20}
                    color={colors.black}
                    strokeWidth={2.5}
                  />
                }
                onPress={() => {
                  console.log('Login');
                }}
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
