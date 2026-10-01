import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {
  User,
  Phone,
  MapPin,
  BriefcaseBusiness,
  ArrowRight,
} from 'lucide-react-native';

import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import { colors } from '../../theme';
const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
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
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-[20px] bg-primary items-center justify-center mb-5">
                <User size={28} color={colors.black} strokeWidth={2.2} />
              </View>
              <AppText variant="heading" className="text-center">
                Complete your profile
              </AppText>
              <AppText
                variant="body"
                color={colors.textSecondary}
                className="text-center mt-2"
              >
                Tell us a little about yourself
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
                label="Mobile Number"
                type="phone"
                value={mobile}
                onChangeText={setMobile}
                placeholder="Enter 10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                leftIcon={<Phone size={20} color={colors.textSecondary} />}
              />
              <AppInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                leftIcon={<MapPin size={20} color={colors.textSecondary} />}
              />
              <AppInput
                label="Business Name"
                value={businessName}
                onChangeText={setBusinessName}
                placeholder="Optional"
                autoCapitalize="words"
                leftIcon={
                  <BriefcaseBusiness size={20} color={colors.textSecondary} />
                }
              />
              <AppButton
                title="Continue"
                rightIcon={
                  <ArrowRight
                    size={20}
                    color={colors.black}
                    strokeWidth={2.5}
                  />
                }
                onPress={() => {
                  navigation.navigate('TaskSelection');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

export default ProfileScreen;
