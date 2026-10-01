import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import {
  Search,
  ArrowRight,
  Wrench,
  UserRound,
  BriefcaseBusiness,
  MapPin,
} from 'lucide-react-native';

import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppButton from '../../components/ui/AppButton';
import TaskCard from '../../components/common/TaskCard';

import {colors} from '../../theme';

const TASKS = [
  {
    id: '1',
    name: 'Plumbing',
    category: 'Home Services',
  },
  {
    id: '2',
    name: 'Electrical Repair',
    category: 'Home Services',
  },
  {
    id: '3',
    name: 'Home Cleaning',
    category: 'Home Services',
  },
  {
    id: '4',
    name: 'AC Repair',
    category: 'Home Services',
  },
  {
    id: '5',
    name: 'Carpentry',
    category: 'Home Services',
  },

  {
    id: '6',
    name: 'Barber',
    category: 'Personal Services',
  },
  {
    id: '7',
    name: 'Makeup Artist',
    category: 'Personal Services',
  },
  {
    id: '8',
    name: 'Fitness Trainer',
    category: 'Personal Services',
  },
  {
    id: '9',
    name: 'Yoga Trainer',
    category: 'Personal Services',
  },
  {
    id: '10',
    name: 'Massage',
    category: 'Personal Services',
  },

  {
    id: '11',
    name: 'Digital Marketing',
    category: 'Business Services',
  },
  {
    id: '12',
    name: 'Accounting',
    category: 'Business Services',
  },
  {
    id: '13',
    name: 'Graphic Design',
    category: 'Business Services',
  },
  {
    id: '14',
    name: 'Web Development',
    category: 'Business Services',
  },
  {
    id: '15',
    name: 'Business Consulting',
    category: 'Business Services',
  },

  {
    id: '16',
    name: 'Delivery',
    category: 'Local Services',
  },
  {
    id: '17',
    name: 'Laundry',
    category: 'Local Services',
  },
  {
    id: '18',
    name: 'Car Wash',
    category: 'Local Services',
  },
  {
    id: '19',
    name: 'Driver',
    category: 'Local Services',
  },
  {
    id: '20',
    name: 'Pest Control',
    category: 'Local Services',
  },
];

const CATEGORY_CONFIG = {
  'Home Services': {
    icon: Wrench,
  },
  'Personal Services': {
    icon: UserRound,
  },
  'Business Services': {
    icon: BriefcaseBusiness,
  },
  'Local Services': {
    icon: MapPin,
  },
};

const TaskSelectionScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return TASKS;
    }

    return TASKS.filter(task =>
      task.name.toLowerCase().includes(query),
    );
  }, [search]);
  const groupedTasks = useMemo(() => {
    return filteredTasks.reduce((groups, task) => {
      if (!groups[task.category]) {
        groups[task.category] = [];
      }
      groups[task.category].push(task);
      return groups;
    }, {});
  }, [filteredTasks]);
  const toggleTask = taskId => {
    setSelectedTasks(current => {
      if (current.includes(taskId)) {
        return current.filter(id => id !== taskId);
      }
      return [...current, taskId];
    });
  };

  return (
    <AppSafeAreaView>
      <View className="flex-1">
        <View className="px-6 pb-4 pt-5">
          <AppText variant="heading">
            Choose your services
          </AppText>
          <AppText
            variant="body"
            color={colors.textSecondary}
            className="mt-2">
            Select the services you are interested in
          </AppText>
          <View className="mt-6 h-[52px] flex-row items-center rounded-xl border border-border bg-surface px-4">
            <Search
              size={20}
              color={colors.textMuted}
            />
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
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 pb-32">
          {Object.keys(groupedTasks).map(category => {
            const CategoryIcon =
              CATEGORY_CONFIG[category]?.icon;

            return (
              <View
                key={category}
                className="mb-7">
                <View className="mb-3 flex-row items-center">
                  <View className="mr-3 h-9 w-9 items-center justify-center rounded-lg bg-borderPrimary">
                    {CategoryIcon && (
                      <CategoryIcon
                        size={18}
                        color={colors.primary}
                      />
                    )}
                  </View>
                  <AppText variant="title">
                    {category}
                  </AppText>
                </View>
                {groupedTasks[category].map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    selected={selectedTasks.includes(task.id)}
                    onPress={() => toggleTask(task.id)}
                  />
                ))}
              </View>
            );
          })}
          {Object.keys(groupedTasks).length === 0 && (
            <View className="items-center py-16">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surfaceLight">
                <Search
                  size={24}
                  color={colors.textMuted}
                />
              </View>

              <AppText
                variant="title"
                className="mt-4">
                No services found
              </AppText>

              <AppText
                variant="bodySmall"
                color={colors.textSecondary}
                className="mt-2 text-center">
                Try a different search
              </AppText>
            </View>
          )}
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-background px-6 pb-5 pt-3">
          <View className="mb-3 flex-row items-center justify-between">
            <AppText
              variant="bodySmall"
              color={colors.textSecondary}>
              {selectedTasks.length} services selected
            </AppText>

            {selectedTasks.length > 0 && (
              <AppText
                variant="bodySmall"
                color={colors.primary}>
                Ready to continue
              </AppText>
            )}
          </View>

          <AppButton
            title="Continue"
            disabled={selectedTasks.length === 0}
            rightIcon={
              <ArrowRight
                size={20}
                color={colors.black}
                strokeWidth={2.5}
              />
            }
            onPress={() => {
              console.log('Selected:', selectedTasks);
              navigation.replace('Main');
            }}
          />
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default TaskSelectionScreen;