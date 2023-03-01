import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';
import {Images} from '../constants/Images';

const CardView = ({img, title, address, time, onChat, onDetails}) => {
  return (
    <View style={styles.container}>
      {img ? (
        <ImageBackground
          source={img}
          resizeMode="cover"
          style={styles.img}
          imageStyle={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
      ) : null}
      <View style={styles.bottomview}>
        <Text style={styles.name} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
        <View style={styles.line} />
      </View>
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

export default CardView;

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
    marginVertical: theme.hp('2%'),
    borderColor: theme.text.gray,
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
