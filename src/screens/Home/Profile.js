import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import Plan from '../../components/Plan';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header profile={true} />
      <Text style={styles.heading}>Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgview}>
          <Image
            style={styles.img}
            source={Images.thumbnail}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.name}>DEEKSHIT SURESH</Text>
        <Text
          style={{
            ...styles.name,
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginVertical: 0,
            marginBottom: 3,
          }}
          numberOfLines={1}>
          EMAIL: Deekshitsuresh@gmail.com
        </Text>
        <Text
          style={{
            ...styles.name,
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginVertical: 0,
          }}>
          PHONE: +919945735175
        </Text>
        <View style={styles.planview}>
          <Text numberOfLines={1} style={styles.current}>
            CURRENT PLAN
          </Text>
          <Plan title={'GOLD'} status={'CURRENT'} />
        </View>
        <View
          style={{
            ...styles.planview,
            width: theme.wp('95%'),
          }}>
          <Text numberOfLines={1} style={styles.current}>
            AVAILABLE PLAN
          </Text>
          <View style={styles.planrow}>
            <Plan title={'BRONZE'} status={'UPGRADE'} />
            <Plan title={'SILVER'} status={'UPGRADE'} />
          </View>
        </View>
        <CustomButton
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }}
          title={'LOGOUT ?'}
          customStyle={{width: '70%', marginVertical: theme.hp('2%')}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    marginHorizontal: theme.wp('5%'),
    marginVertical: theme.hp('1.5%'),
  },
  imgview: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: theme.hp('1.5%'),
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  name: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    marginHorizontal: theme.wp('5%'),
    marginVertical: theme.hp('1.5%'),
    alignSelf: 'center',
    textAlign: 'center',
  },
  planview: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: theme.hp('2%'),
    overflow: 'hidden',
  },
  current: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
  },
  planrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: theme.wp('85%'),
  },
});
