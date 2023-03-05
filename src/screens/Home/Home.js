import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import CustomInput from '../../components/CustomInput';
import CardView from '../../components/CardView';
import {useDispatch, useSelector} from 'react-redux';
import {
  accessChatAction,
  addClickChatAction,
  allChats,
  getBusinessAction,
  getCategoryAction,
  setChatMessages,
} from '../../redux/HomeRedux/homeactions';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import Geocoding from 'react-native-geocoding';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const allCategory = useSelector(state => state.HomeReducer.category);
  const allbusiness = useSelector(state => state.HomeReducer.business);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);
  const [searchData, setsearchData] = useState([]);
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

  useEffect(() => {
    setLoading(true);
    dispatch(getCategoryAction());
    dispatch(allChats());
    getUserLocation();
    dispatch(getBusinessAction('user/allbusiness'));
    setLoading(false);
  }, []);

  const getUserLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'App needs access to your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log('position', position);
        },
        error => {
          if (error?.message == 'Location permission not granted.') {
            Alert.alert(error?.message);
          }
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      Alert.alert('Location Permission not granted.');
    }
  };
  // let link = `/getallgym?limit=0`;

  // if (budget?.length) {
  //   link += `&price[lte]=${budget[1]}&price[gte]=${budget[0]}`;
  // }

  // if (rating) {
  //   link += `&totalratings[gte]=${rating}`;
  // }

  // if (genderselect) {
  //   link += `&gender=${genderselect}`;
  // }

  // if (service) {
  //   link += `&services=${[service]}`;
  // }

  const handleSearch = val => {
    if (val) {
      // let arr = allbusiness?.filter(item =>
      //   item?.name?.toLowerCase().match(val.toLowerCase()),
      // );
      setSearch(val);
      // setsearchData(arr);
    } else {
      setSearch('');
      dispatch(getBusinessAction('user/allbusiness'));
      // setsearchData([]);
    }
  };

  const handleBySearch = async () => {
    if (search) {
      setLoading(true);
      let link = `user/allbusiness?keyword=${search}`;
      dispatch(getBusinessAction(link));
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
        onChatPress={() => navigation.navigate('Chat')}
        onProfilePress={() => navigation.navigate('Profile')}
        profile={true}
      />
      <AppLoader loading={loading} />
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
          onChangeText={val => handleSearch(val)}
        />
        <TouchableOpacity
          onPress={handleBySearch}
          style={{marginRight: '3%'}}
          activeOpacity={0.6}>
          <Image source={Images.search} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.heading}>CATEGORIES</Text>
        {allCategory?.length ? (
          <FlatList
            data={allCategory}
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Category', {category: item})
                  }
                  key={index}
                  style={styles.categoryview}>
                  <Image
                    style={styles.img}
                    source={{uri: item?.url}}
                    resizeMode="cover"
                  />
                  <Text numberOfLines={1} style={styles.title}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.nodata}>No Category Found</Text>
        )}
        <Text style={styles.heading}>TOP LISTING</Text>
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
  nodata: {
    color: theme.primary,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    alignSelf: 'center',
    marginHorizontal: theme.wp('3%'),
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
  img: {
    width: 50,
    height: 50,
    padding: 3,
    borderRadius: 30,
    overflow: 'hidden',
  },
});
