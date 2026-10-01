import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  Bell,
  Search,
  ChevronRight,
  Wrench,
  UserRound,
  BriefcaseBusiness,
} from 'lucide-react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import { colors } from '../../theme';
const selectedTasks = [
  {
    id: '1',
    name: 'Plumbing',
    category: 'Home Services',
    icon: Wrench,
  },
  {
    id: '2',
    name: 'Fitness Trainer',
    category: 'Personal Services',
    icon: UserRound,
  },
  {
    id: '3',
    name: 'Digital Marketing',
    category: 'Business Services',
    icon: BriefcaseBusiness,
  },
];
const HomeScreen = ({ navigation }) => {
  return (
    <AppSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pt-5 pb-1"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <AppText variant="bodySmall" color={colors.textSecondary}>
              Good morning 👋
            </AppText>
            <AppText variant="subHeading" className="mt-1">
              Deepak
            </AppText>
          </View>
          <Pressable
            className="w-11 h-11 rounded-xl bg-surfaceLight border border-border items-center justify-center"
            onPress={() => console.log('Notifications')}
          >
            <Bell size={21} color={colors.textPrimary} />
          </Pressable>
        </View>
        <Pressable
          className="flex-row items-center h-[52px] bg-surface border border-border rounded-xl px-4 mt-6"
          onPress={() => {
            navigation.navigate('Services');
          }}
        >
          <Search size={20} color={colors.textMuted} />
          <AppText variant="body" color={colors.textMuted} className="ml-3">
            Search services...
          </AppText>
        </Pressable>
        <View className="flex-row items-center justify-between mt-8 mb-4">
          <View>
            <AppText variant="title">Your services</AppText>
            <AppText
              variant="bodySmall"
              color={colors.textSecondary}
              className="mt-1"
            >
              Services you've selected
            </AppText>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Services')}
            className="flex-row items-center"
          >
            <AppText variant="bodySmall" color={colors.primary}>
              View all
            </AppText>
            <ChevronRight size={17} color={colors.primary} />
          </Pressable>
        </View>
        <View>
          {selectedTasks.map(task => {
            const Icon = task.icon;
            return (
              <Pressable
                key={task.id}
                className="flex-row items-center bg-surface border border-border rounded-2xl p-4 mb-3"
                onPress={() => console.log('Task:', task.name)}
              >
                <View className="w-12 h-12 rounded-xl bg-borderPrimary items-center justify-center">
                  <Icon size={22} color={colors.primary} />
                </View>
                <View className="flex-1 ml-4">
                  <AppText variant="title">{task.name}</AppText>
                  <AppText
                    variant="bodySmall"
                    color={colors.textSecondary}
                    className="mt-1"
                  >
                    {task.category}
                  </AppText>
                </View>
                <ChevronRight size={20} color={colors.textMuted} />
              </Pressable>
            );
          })}
        </View>
        <View className="mt-5">
          <View className="bg-borderPrimary rounded-2xl p-5">
            <AppText variant="title" color={colors.primary}>
              Looking for something else?
            </AppText>
            <AppText
              variant="bodySmall"
              color={colors.textSecondary}
              className="mt-2"
            >
              Explore more services available around you.
            </AppText>
            <Pressable
              onPress={() => navigation.navigate('Services')}
              className="flex-row items-center mt-4"
            >
              <AppText variant="bodySmall" color={colors.primary}>
                Explore services
              </AppText>
              <ChevronRight size={17} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};
export default HomeScreen;
