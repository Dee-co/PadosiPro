import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react-native';
import Toast from 'react-native-toast-message';

import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppOtpInput from '../../components/ui/AppOtpInput';
import AppButton from '../../components/ui/AppButton';

import { colors, fonts } from '../../theme';
import { verifyOtp, resendOtp } from '../../services/authService';

const VerifyOtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [expirySeconds, setExpirySeconds] = useState(600);
  const [resendSeconds, setResendSeconds] = useState(30);
  const [error, setError] = useState('');
  const email = route?.params?.email || '';
  useEffect(() => {
    if (expirySeconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setExpirySeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [expirySeconds]);
  useEffect(() => {
    if (resendSeconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      return;
    }
    try {
      setLoading(true);
      setError('');
      const response = await verifyOtp({
        email: email.trim().toLowerCase(),
        otp,
      });
      console.log('VERIFY OTP RESPONSE:', response);
      Toast.show({
        type: 'success',
        text1: 'Email Verified',
        text2: 'Your email has been verified successfully',
      });
      navigation.replace('Profile');
    } catch (err) {
      console.log('VERIFY OTP ERROR:', err?.response?.data || err?.message);
      const message =
        err?.response?.data?.message ||
        'Unable to verify OTP. Please try again.';
      setError(message);
      setOtp('');
    } finally {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    if (resendSeconds > 0 || resendLoading) {
      return;
    }
    try {
      setResendLoading(true);
      setError('');
      const response = await resendOtp(email.trim().toLowerCase());
      console.log('RESEND OTP RESPONSE:', response);
      setResendSeconds(30);
      setExpirySeconds(600);
      setOtp('');
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: 'A new verification code has been sent',
      });
    } catch (err) {
      console.log('RESEND OTP ERROR:', err?.response?.data || err?.message);
      const message =
        err?.response?.data?.message ||
        'Unable to resend OTP. Please try again.';
      setError(message);
      const match = message.match(/wait (\d+) seconds/i);
      if (match) {
        setResendSeconds(Number(match[1]));
      }
    } finally {
      setResendLoading(false);
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
          <View className="flex-1 py-8">
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={10}
              className="w-10 h-10 rounded-xl bg-surfaceLight items-center justify-center mb-8"
            >
              <ArrowLeft size={20} color={colors.textPrimary} />
            </Pressable>
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center mb-5">
                <Mail size={28} color={colors.black} strokeWidth={2.2} />
              </View>
              <AppText variant="heading" className="text-center">
                Verify your email
              </AppText>
              <AppText
                variant="body"
                color={colors.textSecondary}
                className="text-center mt-2"
              >
                We've sent a 6-digit verification code to
              </AppText>
              <AppText
                variant="bodySmall"
                color={colors.textPrimary}
                className="text-center mt-1"
                style={{
                  fontFamily: fonts.semiBold,
                }}
              >
                {email}
              </AppText>
            </View>
            <View className="bg-surface rounded-[20px] border border-border p-5">
              <AppText
                variant="bodySmall"
                color={colors.textSecondary}
                className="mb-4 text-center"
              >
                Enter the verification code
              </AppText>
              <AppOtpInput
                value={otp}
                onChangeText={value => {
                  setOtp(value);
                  setError('');
                }}
                onFilled={code => {
                  setOtp(code);
                }}
              />
              {error ? (
                <AppText
                  variant="caption"
                  color={colors.error}
                  className="text-center mt-3"
                >
                  {error}
                </AppText>
              ) : null}
              <View className="items-center mt-6">
                <AppText variant="bodySmall" color={colors.textSecondary}>
                  Code expires in{' '}
                  <AppText
                    variant="bodySmall"
                    color={expirySeconds === 0 ? colors.error : colors.primary}
                    style={{
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    {formatTime(expirySeconds)}
                  </AppText>
                </AppText>
              </View>
              <View className="flex-row justify-center items-center mt-4">
                <AppText variant="bodySmall" color={colors.textSecondary}>
                  Didn't receive the code?{' '}
                </AppText>
                <Pressable
                  onPress={handleResendOtp}
                  disabled={resendSeconds > 0 || resendLoading}
                  hitSlop={8}
                >
                  <AppText
                    variant="bodySmall"
                    color={
                      resendSeconds > 0 ? colors.textMuted : colors.primary
                    }
                    style={{
                      fontFamily: fonts.semiBold,
                    }}
                  >
                    {resendLoading
                      ? 'Sending...'
                      : resendSeconds > 0
                      ? `Resend in ${resendSeconds}s`
                      : 'Resend'}
                  </AppText>
                </Pressable>
              </View>
              <View className="mt-6">
                <AppButton
                  title={loading ? 'Verifying...' : 'Verify Email'}
                  loading={loading}
                  disabled={otp.length !== 6 || loading}
                  rightIcon={
                    <ArrowRight
                      size={20}
                      color={colors.black}
                      strokeWidth={2.5}
                    />
                  }
                  onPress={handleVerifyOtp}
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
