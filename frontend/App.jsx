import './global.css';

import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Mail, Lock, Eye, Plus, User, ChevronRight} from 'lucide-react-native';

import AppText from './src/components/ui/AppText';
import AppInput from './src/components/ui/AppInput';
import AppButton from './src/components/ui/AppButton';
import AppSelect from './src/components/ui/AppSelect';
import AppLoader from './src/components/ui/AppLoader';
import AppSafeAreaView from './src/components/ui/AppSafeAreaView';

import {colors} from './src/theme';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const categories = [
    {
      label: 'Home Services',
      value: 'home',
    },
    {
      label: 'Personal Services',
      value: 'personal',
    },
    {
      label: 'Business Services',
      value: 'business',
    },
    {
      label: 'Local Services',
      value: 'local',
    },
  ];

  return (
    <AppSafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}>
        
        {/* Heading */}
        <AppText variant="heading">
          PadosiPro
        </AppText>

        <AppText
          variant="body"
          color={colors.textSecondary}
          style={{marginTop: 8, marginBottom: 24}}>
          Common Components Test
        </AppText>

        {/* Input */}
        <AppInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          leftIcon={
            <User
              size={20}
              color={colors.textSecondary}
            />
          }
        />

        {/* Email */}
        <AppInput
          label="Email"
          type="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          autoCapitalize="none"
          leftIcon={
            <Mail
              size={20}
              color={colors.textSecondary}
            />
          }
        />

        {/* Password */}
        <AppInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          leftIcon={
            <Lock
              size={20}
              color={colors.textSecondary}
            />
          }
          rightIcon={
            showPassword ? (
              <Eye
                size={20}
                color={colors.primary}
              />
            ) : (
              <Eye
                size={20}
                color={colors.textSecondary}
              />
            )
          }
          onRightIconPress={() =>
            setShowPassword(prev => !prev)
          }
        />

        {/* Select */}
        <AppSelect
          label="Category"
          value={category}
          onChange={setCategory}
          options={categories}
          placeholder="Select category"
        />

        {/* Filled Button */}
        <AppButton
          title="Continue"
          variant="filled"
          onPress={() => console.log('Continue')}
          rightIcon={
            <ChevronRight
              size={20}
              color={colors.black}
            />
          }
        />

        <View style={{height: 12}} />

        {/* Outline Button */}
        <AppButton
          title="Cancel"
          variant="outline"
          onPress={() => console.log('Cancel')}
        />

        <View style={{height: 12}} />

        {/* Icon Button */}
        <AppButton
          variant="icon"
          fullWidth={false}
          icon={
            <Plus
              size={22}
              color={colors.primary}
            />
          }
          onPress={() => console.log('Add')}
        />

        {/* Loader */}
        <View style={{marginTop: 30}}>
          <AppLoader size="small" />
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default App;