import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const window = Dimensions.get('window');

export const theme = {
  black: '#000',
  white: '#fff',
  yellow: '#FFE600',
  tabicon: '#EEB401',
  lightyellow: '#FFF385',
  primary: '#8102FF',
  mediumgray: '#353535',
  darkgray: '#252525',
  secondary: '#F9F3FF',
  dullpurple: '#1D1A23',

  text: {
    gray: '#9F9E9E',
    red: '#DE0A03',
    purple: '#8F00FF',
  },

  // FontFamily
  interbold: 'Inter-Bold',
  interBlack: 'Inter-Black',
  interExtraBold: 'Inter-ExtraBold',
  interExtraLight: 'Inter-ExtraLight',
  interLight: 'Inter-Light',
  interMedium: 'Inter-Medium',
  interRegular: 'Inter-Regular',
  intersemibold: 'Inter-SemiBold',
  interthin: 'Inter-Thin',

  wp,
  hp,
};

export const responsiveSize = baseSize => {
  return (baseSize * window.width) / 360;
};
