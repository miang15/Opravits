import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import {theme} from '../../utils/theme';
import {useRoute} from '@react-navigation/native';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import {
  accessChatAction,
  getBusinessAction,
  setChatMessages,
} from '../../redux/HomeRedux/homeactions';
import {useDispatch} from 'react-redux';
import http from '../../api/http';
import CardView from '../../components/CardView';

const Category = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const details = route?.params?.category;
  const [loading, setLoading] = useState(false);
  const [allbusiness, setAllBusiness] = useState([]);

  useEffect(() => {
    handleCategory(details?.name);
  }, [details]);

  const handleCategory = async val => {
    if (val) {
      setLoading(true);
      let link = `user/allbusiness?category=${val}`;
      const allbusinessRes = await http.get(link);
      if (allbusinessRes?.data?.success) {
        setAllBusiness(allbusinessRes?.data?.data);
      }
      setLoading(false);
    }
  };

  const handleChatClick = async item => {
    setLoading(true);
    dispatch(setChatMessages([]));
    dispatch(accessChatAction(item));
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        chat={true}
        profile={true}
        onChatPress={() => navigation.navigate('Chat')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <AppLoader loading={loading} />
      <View style={styles.row1}>
        <Image source={Images.discovery} />
        <Text style={styles.location} numberOfLines={1}>
          LOCATION: HASSAN, KARNATKA
        </Text>
      </View>

      <Text style={styles.heading}>{details?.name}</Text>
      {allbusiness?.length ? (
        <FlatList
          data={allbusiness.slice(0, 5)}
          renderItem={({item, index}) => {
            return (
              <CardView
                img={{uri: item?.url}}
                title={item?.name}
                address={item?.address}
                time={item?.timings}
                onDetails={() =>
                  navigation.navigate('DetailScreen', {details: item})
                }
                onChat={() => handleChatClick(item)}
              />
            );
          }}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.nodata}>No Business Found</Text>
      )}
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.wp('4%'),
    overflow: 'hidden',
    marginVertical: theme.hp('1.5%'),
  },
  nodata: {
    color: theme.primary,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    alignSelf: 'center',
    marginHorizontal: theme.wp('3%'),
  },
  location: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.7),
    width: theme.wp('85%'),
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    textAlign: 'center',
    marginVertical: theme.hp(1.5),
    textTransform: 'uppercase',
  },
});
