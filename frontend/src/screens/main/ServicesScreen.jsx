import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import {
  Search,
  Wrench,
  UserRound,
  BriefcaseBusiness,
  MapPin,
} from 'lucide-react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import TaskCard from '../../components/common/TaskCard';
import CategoryFilter from '../../components/common/CategoryFilter';
import { colors } from '../../theme';
import AppText from '../../components/ui/AppText';
const CATEGORIES = [
  {
    key: 'All',
    label: 'All',
    icon: null,
  },
  {
    key: 'Home Services',
    label: 'Home',
    icon: Wrench,
  },
  {
    key: 'Personal Services',
    label: 'Personal',
    icon: UserRound,
  },
  {
    key: 'Business Services',
    label: 'Business',
    icon: BriefcaseBusiness,
  },
  {
    key: 'Local Services',
    label: 'Local',
    icon: MapPin,
  },
];
const TASKS = [
  { id: '1', name: 'Plumbing', category: 'Home Services' },
  { id: '2', name: 'Electrical Repair', category: 'Home Services' },
  { id: '3', name: 'Home Cleaning', category: 'Home Services' },
  { id: '4', name: 'AC Repair', category: 'Home Services' },
  { id: '5', name: 'Carpentry', category: 'Home Services' },
  { id: '6', name: 'Barber', category: 'Personal Services' },
  { id: '7', name: 'Makeup Artist', category: 'Personal Services' },
  { id: '8', name: 'Fitness Trainer', category: 'Personal Services' },
  { id: '9', name: 'Yoga Trainer', category: 'Personal Services' },
  { id: '10', name: 'Massage', category: 'Personal Services' },
  { id: '11', name: 'Digital Marketing', category: 'Business Services' },
  { id: '12', name: 'Accounting', category: 'Business Services' },
  { id: '13', name: 'Graphic Design', category: 'Business Services' },
  { id: '14', name: 'Web Development', category: 'Business Services' },
  { id: '15', name: 'Business Consulting', category: 'Business Services' },
  { id: '16', name: 'Delivery', category: 'Local Services' },
  { id: '17', name: 'Laundry', category: 'Local Services' },
  { id: '18', name: 'Car Wash', category: 'Local Services' },
  { id: '19', name: 'Driver', category: 'Local Services' },
  { id: '20', name: 'Pest Control', category: 'Local Services' },
];
const ServicesScreen = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedTasks, setSelectedTasks] = useState(['1', '8', '11']);
  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return TASKS.filter(task => {
      const matchesCategory = category === 'All' || task.category === category;
      const matchesSearch = !query || task.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);
  const toggleTask = taskId => {
    setSelectedTasks(current => {
      if (current.includes(taskId)) {
        return current.filter(id => id !== taskId);
      }
      return [...current, taskId];
    });
  };
  return (
    <AppSafeAreaView bottom={false}>
      <View className="flex-1">
        <View className="px-6 pt-5">
          <AppText variant="heading">Services</AppText>
          <AppText variant="body" color={colors.textSecondary} className="mt-2">
            Find services that match your needs
          </AppText>
          <View className="mt-6 h-[52px] flex-row items-center rounded-xl border border-border bg-surface px-4">
            <Search size={20} color={colors.textMuted} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search services..."
              placeholderTextColor={colors.textMuted}
              className="ml-3 flex-1 text-base text-textPrimary"
              style={{
                fontFamily: 'Eina01-Regular',
              }}
            />
          </View>
          <View className="mt-4">
            <CategoryFilter
              categories={CATEGORIES}
              selectedCategory={category}
              onSelect={setCategory}
              showIcons
            />
          </View>
          <View className="mb-3 mt-6 flex-row items-center justify-between">
            <AppText variant="title">Available services</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              {filteredTasks.length} results
            </AppText>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-8"
        >
          
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              selected={selectedTasks.includes(task.id)}
              onPress={() => toggleTask(task.id)}
            />
          ))}
          {filteredTasks.length === 0 && (
            <View className="items-center py-16">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surfaceLight">
                <Search size={24} color={colors.textMuted} />
              </View>
              <AppText variant="title" className="mt-4">
                No services found
              </AppText>
              <AppText
                variant="bodySmall"
                color={colors.textSecondary}
                className="mt-2 text-center"
              >
                Try another search or category.
              </AppText>
            </View>
          )}
        </ScrollView>
      </View>
    </AppSafeAreaView>
  );
};
export default ServicesScreen;
