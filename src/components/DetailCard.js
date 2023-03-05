import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';
import {Images} from '../constants/Images';

const DetailCard = ({phone, detail, time, onChat, onDetails}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name} numberOfLines={1}>
        {'BUSINESS DETAILS'}
      </Text>
      <Text style={styles.name}>{detail}</Text>
      <Text
        style={{...styles.name, marginTop: theme.hp('2.5%')}}
        numberOfLines={1}>
        {'BUSINESS PHONE'}
      </Text>
      <Text style={styles.name} numberOfLines={1}>
        {phone}
      </Text>

      <View style={styles.line} />
      <View style={styles.row1}>
        <Text style={styles.time} numberOfLines={1}>
          {time}
        </Text>
        <Text onPress={onDetails} style={styles.detail}>
          DETAILS
        </Text>
        <Text onPress={onChat} style={styles.chat}>
          CHAT
        </Text>
      </View>
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: theme.wp('85%'),
    backgroundColor: theme.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: theme.hp('1.5%'),
    paddingTop: theme.hp('2%'),
  },
  img: {
    width: '100%',
    height: theme.hp('25%'),
    alignSelf: 'center',
  },
  bottomview: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: theme.white,
    marginTop: theme.hp('-2%'),
    paddingTop: theme.hp('1.5%'),
  },
  name: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp('2%'),
    marginHorizontal: '4%',
    marginBottom: '2%',
  },
  address: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp('2%'),
    marginHorizontal: '4%',
    marginBottom: '2%',
  },
  line: {
    borderWidth: 0.6,
    marginBottom: theme.hp('2%'),
    borderColor: theme.text.gray,
    marginTop: theme.hp('5%'),
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.wp('3%'),
    marginBottom: theme.hp('1.5%'),
    width: '100%',
  },
  time: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    width: '40%',
  },
  detail: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.5),
    width: '26%',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  chat: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.5),
    width: '26%',
    textAlign: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
});
