import React, { useEffect } from 'react';
import { View } from 'react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppLoader from '../../components/ui/AppLoader';
import { colors } from '../../theme';
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <AppSafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <AppText
            variant="heading"
            color={colors.black}
            style={{ fontSize: 30 }}
          >
            P
          </AppText>
        </View>
        <AppText variant="heading">PadosiPro</AppText>
        <AppText
          variant="body"
          color={colors.textSecondary}
          style={{
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          Your local services partner
        </AppText>
        <View style={{ marginTop: 32 }}>
          <AppLoader size="small" />
        </View>
      </View>
    </AppSafeAreaView>
  );
};
export default SplashScreen;
