import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {theme} from '../utils/theme';

const Plan = ({title, status, onPress}) => {
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.plan}>
        {title}
      </Text>
      <View style={styles.bottom}>
        <Text onPress={onPress} style={styles.btn}>
          {status}
        </Text>
      </View>
    </View>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.wp('1.5%'),
    marginVertical: theme.hp('1.5%'),
    borderWidth: 1,
    borderColor: theme.black,
    alignSelf: 'flex-start',
    borderRadius: 15,
    paddingTop: 10,
    width: theme.wp('35%'),
    overflow: 'hidden',
  },
  plan: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.9),
    marginVertical: theme.hp('2.5%'),
    width: '80%',
    textAlign: 'center',
    lineHeight: 21,
    alignSelf: 'center',
  },
  bottom: {
    borderTopWidth: 1,
    borderLeftWidth: 0.8,
    borderRightWidth: 0.8,
    paddingVertical: theme.hp('3.2%'),
    paddingHorizontal: 5,
    borderRadius: 15,
    borderColor: theme.black,
  },
  btn: {
    backgroundColor: theme.primary,
    alignSelf: 'center',
    width: '85%',
    textAlign: 'center',
    color: theme.white,
    fontFamily: theme.interbold,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
