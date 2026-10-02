import React from 'react';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, BriefcaseBusiness, UserRound } from 'lucide-react-native';
import HomeScreen from '../screens/main/HomeScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import AccountProfileScreen from '../screens/main/ProfileScreen';
import EditProfileScreen from '../screens/onboarding/ProfileScreen';
import { colors } from '../theme';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const NoFeedbackTabButton = ({
  children,
  onPress,
  onLongPress,
  style,
  testID,
  accessibilityLabel,
  accessibilityState,
}) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    testID={testID}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityState={accessibilityState}
    android_ripple={null}
    style={style}
  >
    {children}
  </Pressable>
);
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarButton: props => <NoFeedbackTabButton {...props} />,
        animation: 'none',
        tabBarStyle: {
          height: 68 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'Eina01-Regular',
          fontSize: 12,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <BriefcaseBusiness
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserRound
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export default MainNavigator;