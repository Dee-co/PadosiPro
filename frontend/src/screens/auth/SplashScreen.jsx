import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import AppSafeAreaView from '../../components/ui/AppSafeAreaView';
import AppText from '../../components/ui/AppText';
import AppLoader from '../../components/ui/AppLoader';
import { useTheme } from '../../context/ThemeContext';
import PadosiProLogo from '../../assets/images/padosipro-logo.png';
const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
            borderWidth: 2,
            borderColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Image
            source={PadosiProLogo}
            style={{
              width: 46,
              height: 46,
              resizeMode: 'contain',
            }}
          />
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
