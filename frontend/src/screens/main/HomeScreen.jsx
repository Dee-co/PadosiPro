import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';
import {
  Bell,
  Search,
  ChevronRight,
  Wrench,
  UserRound,
  BriefcaseBusiness,
  MapPin,
} from 'lucide-react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppLoader from '../../components/ui/AppLoader';
import { colors } from '../../theme';
import { getSelectedTasks } from '../../services/taskService';
import { useAuth } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
const getCategoryIcon = category => {
  switch (category) {
    case 'Home Services':
      return Wrench;
    case 'Personal Services':
      return UserRound;
    case 'Business Services':
      return BriefcaseBusiness;
    case 'Local Services':
      return MapPin;
    default:
      return Wrench;
  }
};
const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const loadSelectedTasks = useCallback(async (isRefresh = false) => {
    try {
      setError('');
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      const response = await getSelectedTasks();
      console.log('HOME SELECTED TASKS RESPONSE:', response);
      const selectedData = response?.data;
      let tasks = [];
      if (Array.isArray(selectedData)) {
        tasks = selectedData;
      } else if (Array.isArray(selectedData?.tasks)) {
        tasks = selectedData.tasks;
      } else if (Array.isArray(selectedData?.selectedTasks)) {
        tasks = selectedData.selectedTasks;
      }
      setSelectedTasks(tasks);
    } catch (err) {
      console.log(
        'HOME SELECTED TASKS ERROR:',
        err?.response?.data || err?.message,
      );
      setError(err?.response?.data?.message || 'Unable to load your services.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadSelectedTasks();
      return () => {};
    }, [loadSelectedTasks]),
  );
  const firstName = user?.name?.trim()?.split(' ')[0] || 'there';
  if (loading) {
    return (
      <AppSafeAreaView>
        <AppLoader fullScreen />
      </AppSafeAreaView>
    );
  }
  const renderHeader = () => (
    <>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-4">
          <AppText variant="bodySmall" color={colors.textSecondary}>
            Good morning 👋
          </AppText>
          <AppText variant="subHeading" className="mt-1">
            {firstName}
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
        onPress={() => navigation.navigate('Services')}
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
      {error ? (
        <View className="bg-surface border border-border rounded-2xl p-5 mb-4">
          <AppText variant="bodySmall" color={colors.error}>
            {error}
          </AppText>
          <Pressable onPress={() => loadSelectedTasks()} className="mt-3">
            <AppText variant="bodySmall" color={colors.primary}>
              Try again
            </AppText>
          </Pressable>
        </View>
      ) : null}
      {!error && selectedTasks.length === 0 ? (
        <View className="bg-surface border border-border rounded-2xl p-6 items-center mb-5">
          <View className="w-14 h-14 rounded-full bg-surfaceLight items-center justify-center">
            <BriefcaseBusiness size={24} color={colors.primary} />
          </View>
          <AppText variant="title" style={{ marginTop: 16 }}>
            No services selected
          </AppText>
          <AppText
            variant="bodySmall"
            color={colors.textSecondary}
            style={{
              textAlign: 'center',
              marginTop: 6,
            }}
          >
            Select services you provide to get started.
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
      ) : null}
    </>
  );
  const renderTask = ({ item }) => {
    const Icon = getCategoryIcon(item.category);
    return (
      <Pressable
        className="flex-row items-center bg-surface border border-border rounded-2xl p-4 mb-3"
        onPress={() => console.log('Task:', item.name)}
      >
        <View className="w-12 h-12 rounded-xl bg-borderPrimary items-center justify-center">
          <Icon size={22} color={colors.primary} />
        </View>
        <View className="flex-1 ml-4 mr-2">
          <AppText variant="title">{item.name}</AppText>
          <AppText
            variant="bodySmall"
            color={colors.textSecondary}
            className="mt-1"
          >
            {item.category}
          </AppText>
        </View>
        <ChevronRight size={20} color={colors.textMuted} />
      </Pressable>
    );
  };
  const renderFooter = () => {
    if (selectedTasks.length === 0) {
      return null;
    }
    return (
      <View className="mt-2 mb-2">
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
    );
  };
  return (
    <AppSafeAreaView bottom={false}>
      <FlatList
        data={selectedTasks}
        keyExtractor={item => String(item.id)}
        renderItem={renderTask}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 32,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadSelectedTasks(true)}
            tintColor={colors.primary}
          />
        }
      />
    </AppSafeAreaView>
  );
};

export default HomeScreen;
