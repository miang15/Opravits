import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../constants/Images';
import {theme} from '../utils/theme';

const Header = ({chat, profile, onChatPress, onProfilePress}) => {
  return (
    <View style={styles.row}>
      {chat ? (
        <TouchableOpacity
          style={{overflow: 'hidden'}}
          onPress={onChatPress}
          activeOpacity={0.6}>
          <Image source={Images.chat} />
        </TouchableOpacity>
      ) : (
        <View style={{width: theme.wp('5%')}} />
      )}
      <Image source={Images.logo} />
      {profile ? (
        <TouchableOpacity
          onPress={onProfilePress}
          style={{marginRight: '3%'}}
          activeOpacity={0.6}>
          <Image source={Images.profile} />
        </TouchableOpacity>
      ) : (
        <View style={{width: theme.wp('5%')}} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.wp('3%'),
    overflow: 'hidden',
  },
});
