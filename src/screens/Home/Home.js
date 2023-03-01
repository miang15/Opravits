import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import CustomInput from '../../components/CustomInput';
import CardView from '../../components/CardView';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([
    {
      id: 1,
      title: 'HOTEL',
      img: Images.hotel,
    },
    {
      id: 2,
      title: 'SPA',
      img: Images.spa,
    },
    {
      id: 3,
      title: 'SCHOOL',
      img: Images.school,
    },
    {
      id: 4,
      title: 'HARDWARE',
      img: Images.hardware,
    },
    {
      id: 5,
      title: 'GARAGE',
      img: Images.garage,
    },
    {
      id: 6,
      title: 'HOSPITAL',
      img: Images.hospital,
    },
    {
      id: 7,
      title: 'HOSTEL',
      img: Images.hostel,
    },
    {
      id: 8,
      title: 'GYM',
      img: Images.gym,
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        chat={true}
        onChatPress={() => navigation.navigate('Chat')}
        onProfilePress={() => navigation.navigate('Profile')}
        profile={true}
      />
      <View style={styles.row1}>
        <Image source={Images.discovery} />
        <Text style={styles.location} numberOfLines={1}>
          LOCATION: HASSAN, KARNATKA
        </Text>
      </View>
      <View style={styles.row2}>
        <CustomInput
          customStyle={{width: '85%'}}
          placeholder={'Search Here'}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={{marginRight: '3%'}} activeOpacity={0.6}>
          <Image source={Images.search} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.heading}>CATEGORIES</Text>
        <FlatList
          numColumns={4}
          style={{flexGrow: 0}}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: theme.wp('3%'),
            alignSelf: 'center',
            width: theme.wp('95%'),
            overflow: 'hidden',
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity key={index} style={styles.categoryview}>
                <Image source={item?.img} />
                <Text numberOfLines={1} style={styles.title}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          data={category}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.heading}>TOP LISTING</Text>
        <CardView
          img={Images.thumbnail}
          title={'BUSINESS NAME'}
          address={'BUSINESS ADDRESS'}
          time={'12:03 22:03'}
          onDetails={() => navigation.navigate('DetailScreen')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
  location: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.7),
    width: theme.wp('85%'),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.wp('3%'),
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    textAlign: 'center',
    marginVertical: theme.hp(1.5),
  },
  categoryview: {
    alignItems: 'center',
    width: '24%',
    marginBottom: theme.hp('3%'),
  },
  title: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.7),
    marginTop: theme.hp('0.7%'),
  },
});
