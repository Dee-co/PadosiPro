import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import {
  User,
  Mail,
  Lock,
  Eye,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react-native';

import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import { colors, fonts } from '../../theme';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
          <View className="flex-1 justify-center py-8">
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={10}
              className="w-10 h-10 rounded-xl bg-surfaceLight items-center justify-center mb-6"
            >
              <ArrowLeft size={20} color={colors.textPrimary} />
            </Pressable>
            <View className="items-center mb-7">
              <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center mb-5">
                <User size={28} color={colors.black} strokeWidth={2.2} />
              </View>
              <AppText variant="heading" className="text-center">
                Create account
              </AppText>
              <AppText
                variant="body"
                color={colors.textSecondary}
                className="text-center mt-2"
              >
                Join PadosiPro and discover local services
              </AppText>
            </View>
            <View className="bg-surface rounded-[20px] border border-border p-5">
              <AppInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                autoCapitalize="words"
                autoCorrect={false}
                leftIcon={<User size={20} color={colors.textSecondary} />}
              />
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
                placeholder="Create a password"
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
              <AppInput
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Lock size={20} color={colors.textSecondary} />}
                rightIcon={
                  <Eye
                    size={20}
                    color={
                      showConfirmPassword
                        ? colors.primary
                        : colors.textSecondary
                    }
                  />
                }
                onRightIconPress={() => setShowConfirmPassword(prev => !prev)}
              />
              <AppButton
                title="Create Account"
                rightIcon={
                  <ArrowRight
                    size={20}
                    color={colors.black}
                    strokeWidth={2.5}
                  />
                }
                onPress={() => {
                  navigation.navigate('VerifyOtp', {
                    email,
                  });
                }}
              />
            </View>
            <View className="flex-row justify-center items-center mt-7">
              <AppText variant="bodySmall" color={colors.textSecondary}>
                Already have an account?
              </AppText>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                hitSlop={8}
              >
                <AppText
                  variant="bodySmall"
                  color={colors.primary}
                  style={{
                    fontFamily: fonts.semiBold,
                  }}
                >
                  Login
                </AppText>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default RegisterScreen;
