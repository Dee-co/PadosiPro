import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import AppText from '../../../../components/ui/AppText';
import { useTheme } from '../../../../context/ThemeContext';

// Compact chips row. Ye sticky header ke andar use hota hai,
// isliye "Categories" title hata diya hai.
const CategorySection = ({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) => {
  const { colors } = useTheme();

  const renderCategory = (categoryId, name) => {
    const isSelected = selectedCategory === categoryId;

    return (
      <Pressable
        key={categoryId ?? 'all'}
        onPress={() => onSelectCategory(categoryId)}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
        style={{
          height: 38,
          marginRight: 10,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 19,
          borderWidth: 1,
          backgroundColor: isSelected ? colors.primary : colors.surface,
          borderColor: isSelected ? colors.primary : colors.border,
        }}
      >
        <AppText
          variant="bodySmall"
          color={isSelected ? colors.black : colors.textPrimary}
          style={{ includeFontPadding: false }}
        >
          {name}
        </AppText>
      </Pressable>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingHorizontal: 20 }}
    >
      {renderCategory(null, 'All')}

      {categories.map(category =>
        renderCategory(category.id, category.name),
      )}
    </ScrollView>
  );
};

export default CategorySection;