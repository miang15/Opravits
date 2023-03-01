import {StyleSheet, ScrollView, Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import DetailCard from '../../components/DetailCard';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import CardView from '../../components/CardView';

const DetailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        chat={true}
        profile={true}
        onChatPress={() => navigation.navigate('Chat')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>HOTELS</Text>
        <CardView
          img={Images.thumbnail}
          title={'BUSINESS NAME'}
          address={'BUSINESS ADDRESS'}
          time={'12:03 22:03'}
        />
        <DetailCard
          title={'BUSINESS DETAILS'}
          detail={
            'DDDDDKJJDJDJDDJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'
          }
          phone={'BUSINESS PHONE'}
          time={'12:03 - 22:03'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    textAlign: 'center',
    marginVertical: theme.hp(1.5),
  },
});
