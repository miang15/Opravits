import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../constants/Images';
import {responsiveSize, theme} from '../utils/theme';
import {getLocalStorage} from '../utils/actions';

const Splash = ({navigation}) => {
  useEffect(() => {
    navigation.addListener('focus', () => {
      handleSession();
    });
  }, []);

  const handleSession = async () => {
    navigation.replace('Login');
    // const token = await getLocalStorage('loggedIn');
    // setTimeout(() => {
    //   if (token) {
    //     // navigation.replace('BottomTab');
    //   } else {
    //     navigation.replace('Login');
    //   }
    // }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.logo} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  logo: {
    marginBottom: responsiveSize(30),
    alignSelf: 'center',
  },
});
