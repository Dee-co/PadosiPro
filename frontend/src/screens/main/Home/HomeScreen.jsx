import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  Pressable,
  SectionList,
  TextInput,
  View,
} from 'react-native';

import { Bell, Search, X } from 'lucide-react-native';

import AppSafeAreaView from '../../../components/ui/AppSafeAreaView';
import AppText from '../../../components/ui/AppText';

import CategorySection from './components/CategorySection';
import ProductSection from './components/ProductSection';

import { categories, products } from '../../../data/homeData';
import { useTheme } from '../../../context/ThemeContext';

const NUM_COLUMNS = 2;

const chunk = (items, size) => {
  const rows = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
};

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // { [productId]: quantity }
  // TODO: yaha apna cart context / redux store connect karna.
  const [cart, setCart] = useState({});

  // Sticky bar jab top pe chipak jaye tab border + shadow dikhane ke liye
  const welcomeHeight = useRef(0);
  const [isStuck, setIsStuck] = useState(false);

  const handleScroll = useCallback(event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsStuck(offsetY >= welcomeHeight.current - 1);
  }, []);

  const addToCart = useCallback(product => {
    setCart(prev => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
  }, []);

  const removeFromCart = useCallback(product => {
    setCart(prev => {
      const next = { ...prev };
      const quantity = (next[product.id] ?? 0) - 1;

      if (quantity > 0) {
        next[product.id] = quantity;
      } else {
        delete next[product.id];
      }

      return next;
    });
  }, []);

  const handleProductPress = useCallback(product => {
    console.log('Selected product:', product.id);
    // Product details navigation baad mein connect karna.
  }, []);

  const clearFilters = () => {
    setSearchValue('');
    setSelectedCategory(null);
  };

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'all' ||
        product.category?.id === selectedCategory;

      const matchesSearch =
        !query ||
        product.name?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category?.name?.toLowerCase().includes(query) ||
        product.subCategory?.name?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchValue]);

  const selectedCategoryName = categories.find(
    category => category.id === selectedCategory,
  )?.name;

  // SectionList numColumns support nahi karta, isliye products ko
  // 2-2 ki rows me tod rahe hain. Heading aur empty state bhi list items hain.
  const sections = useMemo(() => {
    const items = [{ key: 'heading', type: 'heading' }];

    if (filteredProducts.length === 0) {
      items.push({ key: 'empty', type: 'empty' });
    } else {
      chunk(filteredProducts, NUM_COLUMNS).forEach(row => {
        items.push({
          key: `row-${row.map(product => product.id).join('-')}`,
          type: 'row',
          products: row,
        });
      });
    }

    return [{ key: 'products', data: items }];
  }, [filteredProducts]);

  // Scroll ke saath jaane wala hissa (sticky nahi)
  const renderWelcome = () => (
    <View
      onLayout={event => {
        welcomeHeight.current = event.nativeEvent.layout.height;
      }}
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <AppText variant="bodySmall" color={colors.textSecondary}>
            Welcome to DELIBO 👋
          </AppText>

          <AppText variant="heading" className="mt-1">
            Discover products
          </AppText>
        </View>

        <Pressable
          onPress={() => console.log('Notifications pressed')}
          className="h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: colors.surface }}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
        >
          <Bell size={22} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );

  // Sticky hissa: search + categories.
  // NOTE: ye function hai, component nahi. Component bana diya to har render
  // pe remount hoga aur typing ke beech keyboard band ho jayega.
  const renderStickyBar = () => (
    <View
      style={{
        paddingTop: 8,
        paddingBottom: 12,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: isStuck ? colors.border : 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: isStuck ? 0.15 : 0,
        shadowRadius: 4,
        elevation: isStuck ? 4 : 0,
      }}
    >
      {/* Search bar */}
      <View
        className="flex-row items-center rounded-xl border px-4"
        style={{
          height: 48,
          marginHorizontal: 20,
          marginBottom: 12,
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        <Search size={20} color={colors.textMuted} />

        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search products..."
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          className="ml-3 flex-1 py-0"
          style={{
            color: colors.textPrimary,
            fontSize: 14,
          }}
        />

        {searchValue.length > 0 && (
          <Pressable
            onPress={() => setSearchValue('')}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <X size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {/* Categories */}
      <CategorySection
        categories={categories.filter(category => category.id !== 'all')}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.type === 'heading') {
      return (
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 12,
          }}
        >
          <AppText variant="title">
            {searchValue.trim()
              ? 'Search results'
              : selectedCategory
                ? selectedCategoryName || 'Products'
                : 'Popular products'}
          </AppText>

          <AppText
            variant="bodySmall"
            color={colors.textSecondary}
            className="mt-1"
          >
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'} found
          </AppText>
        </View>
      );
    }

    if (item.type === 'empty') {
      return (
        <View className="items-center px-5 py-10">
          <AppText variant="title">No products found</AppText>

          <AppText
            variant="bodySmall"
            color={colors.textSecondary}
            className="mt-2 text-center"
          >
            Try another search or select a different category.
          </AppText>

          <Pressable
            onPress={clearFilters}
            className="mt-4 rounded-xl px-5 py-3"
            style={{ backgroundColor: colors.primary }}
          >
            <AppText color="#111111" className="font-semibold">
              Clear filters
            </AppText>
          </Pressable>
        </View>
      );
    }

    // Product row (2 cards)
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 14 }}>
        {item.products.map(product => (
          <ProductSection
            key={product.id}
            product={product}
            quantity={cart[product.id] ?? 0}
            onPress={handleProductPress}
            onAddToCart={addToCart}
            onIncrement={addToCart}
            onDecrement={removeFromCart}
          />
        ))}

        {/* Last row me sirf 1 product ho to card poori width na le */}
        {item.products.length < NUM_COLUMNS && (
          <View style={{ flex: 1, marginHorizontal: 6 }} />
        )}
      </View>
    );
  };

  return (
    <AppSafeAreaView bottom={false}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        renderSectionHeader={renderStickyBar}
        stickySectionHeadersEnabled
        ListHeaderComponent={renderWelcome}
        // renderItem / sticky bar state (cart, search, isStuck) use karte hain,
        // isliye extraData zaroori hai warna cells update nahi hote.
        extraData={{
          cart,
          searchValue,
          selectedCategory,
          isStuck,
          colors,
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28, flexGrow: 1 }}
      />
    </AppSafeAreaView>
  );
};

export default HomeScreen;