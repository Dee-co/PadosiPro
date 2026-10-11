import React, { memo } from 'react';
import { Image, Pressable, View } from 'react-native';
import {
  ImageOff,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from 'lucide-react-native';

import AppText from '../../../../components/ui/AppText';
import AppButton from '../../../../components/ui/AppButton';
import { useTheme } from '../../../../context/ThemeContext';
import { fonts } from '../../../../theme';

const ACTION_HEIGHT = 40;

const toTitleCase = (text = '') =>
  text
    .trim()
    .replace(
      /\w\S*/g,
      word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

const formatPrice = value =>
  `₹${Number(value ?? 0).toLocaleString('en-IN')}`;

const getUnitLabel = variant => {
  const unitValue = Number(variant?.unitValue ?? 0);
  const unit = variant?.unit?.value;

  if (!unitValue || !unit) {
    return '';
  }

  if (unit === 'pc') {
    return `${unitValue} ${unitValue > 1 ? 'pcs' : 'pc'}`;
  }

  if (unit === 'set') {
    return `${unitValue} ${unitValue > 1 ? 'sets' : 'set'}`;
  }

  return `${unitValue} ${variant?.unit?.label ?? unit}`;
};

const ProductSection = ({
  product,
  quantity = 0,
  onPress,
  onAddToCart,
  onIncrement,
  onDecrement,
}) => {
  const { colors } = useTheme();

  const minPrice = Number(product?.price?.min ?? 0);
  const maxPrice = Number(product?.price?.max ?? minPrice);
  const hasPriceRange = maxPrice > minPrice;

  const variants = product?.variants ?? [];
  const hasOptions = variants.length > 1;

  const rating = Number(product?.rating?.value ?? 0);
  const imageUrl = product?.image?.url;
  const isAvailable = product?.available !== false;

  // Discount sirf single-variant product par dikhate hain,
  // multi-variant me min price kisi ek variant se match nahi karta.
  const compareAtPrice = hasOptions
    ? 0
    : Number(variants[0]?.compareAtPrice ?? 0);
  const discount =
    compareAtPrice > minPrice
      ? Math.round(((compareAtPrice - minPrice) / compareAtPrice) * 100)
      : 0;

  const metaText = hasOptions
    ? `${variants.length} options`
    : getUnitLabel(variants[0]);

  const renderAction = () => {
    if (!isAvailable) {
      return (
        <AppButton
          title="Out of stock"
          variant="outline"
          size="sm"
          disabled
          style={{ height: ACTION_HEIGHT }}
          textStyle={{ fontSize: 14 }}
        />
      );
    }

    if (quantity > 0) {
      return (
        <View
          style={{
            height: ACTION_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: 10,
            paddingHorizontal: 4,
            backgroundColor: colors.primary,
          }}
        >
          <Pressable
            onPress={() => onDecrement?.(product)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Remove one ${product?.name}`}
            style={{
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Minus size={18} color={colors.black} />
          </Pressable>

          <AppText variant="button" color={colors.black}>
            {quantity}
          </AppText>

          <Pressable
            onPress={() => onIncrement?.(product)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Add one more ${product?.name}`}
            style={{
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={18} color={colors.black} />
          </Pressable>
        </View>
      );
    }

    return (
      <AppButton
        title="Add to cart"
        size="sm"
        onPress={() => onAddToCart?.(product)}
        leftIcon={<ShoppingCart size={16} color={colors.black} />}
        style={{ height: ACTION_HEIGHT, paddingHorizontal: 8 }}
        textStyle={{ fontSize: 14 }}
      />
    );
  };

  return (
    // Shadow ke liye alag wrapper, kyunki overflow:hidden ke saath iOS shadow clip ho jata hai
    <View
      style={{
        flex: 1,
        marginHorizontal: 6,
        marginBottom: 14,
        borderRadius: 16,
        backgroundColor: colors.surface,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <Pressable
        onPress={() => onPress?.(product)}
        accessibilityRole="button"
        accessibilityLabel={product?.name}
        style={({ pressed }) => ({
          flex: 1,
          overflow: 'hidden',
          borderRadius: 16,
          borderWidth: 1,
          borderColor: colors.border,
          opacity: pressed ? 0.94 : 1,
        })}
      >
        {/* Image */}
        <View
          style={{
            aspectRatio: 1.15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surfaceLight,
          }}
        >
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <ImageOff size={28} color={colors.textMuted} />
          )}

          {/* Out of stock overlay */}
          {!isAvailable && (
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.45)',
              }}
            >
              <View
                style={{
                  borderRadius: 999,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                }}
              >
                <AppText
                  variant="caption"
                  color="#FFFFFF"
                  style={{ fontFamily: fonts.semiBold }}
                >
                  Currently unavailable
                </AppText>
              </View>
            </View>
          )}

          {/* Discount badge */}
          {isAvailable && discount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 8,
                left: 8,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 3,
                backgroundColor: colors.primary,
              }}
            >
              <AppText
                variant="caption"
                color={colors.black}
                style={{ fontFamily: fonts.semiBold }}
              >
                {discount}% OFF
              </AppText>
            </View>
          )}

          {/* Rating badge (sirf jab rating ho) */}
          {rating > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 3,
                backgroundColor: colors.surface,
              }}
            >
              <Star size={12} color={colors.primary} fill={colors.primary} />
              <AppText
                variant="caption"
                style={{ marginLeft: 3, fontFamily: fonts.semiBold }}
              >
                {rating.toFixed(1)}
              </AppText>
            </View>
          )}
        </View>

        {/* Details */}
        <View style={{ flex: 1, padding: 12, justifyContent: 'space-between' }}>
          <View>
            <AppText
              variant="title"
              numberOfLines={2}
              style={{ fontSize: 15, lineHeight: 21, minHeight: 42 }}
            >
              {product?.name ?? 'Untitled product'}
            </AppText>

            {!!product?.brand && (
              <AppText
                variant="caption"
                color={colors.textSecondary}
                numberOfLines={1}
                style={{ marginTop: 2 }}
              >
                {toTitleCase(product.brand)}
              </AppText>
            )}

            {!!metaText && (
              <AppText
                variant="caption"
                color={colors.textMuted}
                numberOfLines={1}
                style={{ marginTop: 2 }}
              >
                {metaText}
              </AppText>
            )}

            {/* Price */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                marginTop: 8,
              }}
            >
              <AppText variant="title" style={{ fontSize: 17 }}>
                {formatPrice(minPrice)}
              </AppText>

              {hasPriceRange && (
                <AppText
                  variant="caption"
                  color={colors.textMuted}
                  style={{ marginLeft: 4 }}
                >
                  onwards
                </AppText>
              )}

              {discount > 0 && !hasPriceRange && (
                <AppText
                  variant="caption"
                  color={colors.textMuted}
                  style={{
                    marginLeft: 6,
                    textDecorationLine: 'line-through',
                  }}
                >
                  {formatPrice(compareAtPrice)}
                </AppText>
              )}
            </View>
          </View>

          {/* Add to cart */}
          <View style={{ marginTop: 12 }}>{renderAction()}</View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(ProductSection);