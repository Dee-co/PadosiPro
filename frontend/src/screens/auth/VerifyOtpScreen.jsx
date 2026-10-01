import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, Pressable, ScrollView, View} from 'react-native';
import {ArrowLeft, ArrowRight, Mail} from 'lucide-react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppOtpInput from '../../components/ui/AppOtpInput';
import AppButton from '../../components/ui/AppButton';
import {colors, fonts} from '../../theme';
const VerifyOtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const email = route?.params?.email || 'your email';
  return (
    <AppSafeAreaView>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-grow px-6">
          <View className="flex-1 justify-center py-8">
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={10}
              className="w-10 h-10 rounded-xl bg-surfaceLight items-center justify-center mb-8">
              <ArrowLeft
                size={20}
                color={colors.textPrimary}
              />
            </Pressable>
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center mb-5">
                <Mail
                  size={28}
                  color={colors.black}
                  strokeWidth={2.2}
                />
              </View>
              <AppText
                variant="heading"
                className="text-center">
                Verify your email
              </AppText>
              <AppText
                variant="body"
                color={colors.textSecondary}
                className="text-center mt-2">
                We've sent a 6-digit verification code to
              </AppText>
              <AppText
                variant="bodySmall"
                color={colors.textPrimary}
                className="text-center mt-1"
                style={{
                  fontFamily: fonts.semiBold,
                }}>
                {email}
              </AppText>
            </View>
            <View className="bg-surface rounded-[20px] border border-border p-5">
              <AppText
                variant="bodySmall"
                color={colors.textSecondary}
                className="mb-4 text-center">
                Enter the verification code
              </AppText>
              <AppOtpInput
                value={otp}
                onChangeText={setOtp}
                onFilled={code => {
                  console.log('OTP:', code);
                }}
              />
              <View className="items-center mt-6">
                <AppText
                  variant="bodySmall"
                  color={colors.textSecondary}>
                  Code expires in
                  <AppText
                    variant="bodySmall"
                    color={colors.primary}
                    style={{
                      fontFamily: fonts.semiBold,
                    }}>
                    10:00
                  </AppText>
                </AppText>
              </View>
              <View className="flex-row justify-center items-center mt-4">
                <AppText
                  variant="bodySmall"
                  color={colors.textSecondary}>
                  Didn't receive the code?
                </AppText>
                <Pressable
                  onPress={() => console.log('Resend OTP')}
                  hitSlop={8}>
                  <AppText
                    variant="bodySmall"
                    color={colors.primary}
                    style={{
                      fontFamily: fonts.semiBold,
                    }}>
                    Resend
                  </AppText>
                </Pressable>
              </View>
              <View className="mt-6">
                <AppButton
                  title="Verify Email"
                  disabled={otp.length !== 6}
                  rightIcon={
                    <ArrowRight
                      size={20}
                      color={colors.black}
                      strokeWidth={2.5}
                    />
                  }
                  onPress={() => {
                     navigation.replace('Profile');
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default VerifyOtpScreen;