import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import Plan from '../../components/Plan';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../../api/http';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import {showMessage} from 'react-native-flash-message';
import {getLocalStorage} from '../../utils/actions';
import {
  CardField,
  useStripe,
  useConfirmPayment,
  StripeProvider,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [allPlans, setAllPlans] = useState([]);
  const [loading, setloading] = useState(false);
  const [profile, setProfile] = useState('');
  const {initPaymentSheet, presentPaymentSheet} = usePaymentSheet();

  useEffect(() => {
    getPlansData();
  }, []);

  const getPlansData = async () => {
    setloading(true);
    const user = await getLocalStorage('userData');
    const parseData = JSON.parse(user);
    setProfile(parseData);
    const plans = await http.get('user/getallmembership');
    if (plans?.data?.success) {
      setAllPlans(plans?.data?.membership);
    }
    setloading(false);
  };

  const handleBuyNow = async val => {
    setloading(true);
    const buyRes = await http.post('user/buymembership', {id: val});

    if (buyRes?.data?.success) {
      getPlansData();
      showMessage({
        message: 'Success',
        description: 'Membership Buy Successfully',
        type: 'success',
        duration: 1500,
      });
    }
    setloading(false);
  };

  const handlePayment = async val => {
    console.log('handle value: ', val);
    const data = {
      amount: val?.price,
    };
    const token = await getLocalStorage('token');
    var config = {
      method: 'post',
      url: 'http://ec2-3-109-4-176.ap-south-1.compute.amazonaws.com:5000/create-payment-intent',
      headers: {
        Authentication: `${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(async response => {
        if (response?.data?.client_secret) {
          const {error} = await initPaymentSheet({
            // customerId: response?.data?.customer,
            // customerEphemeralKeySecret:
            //   'sk_test_51MgOkDFWfgPTBcgn76nC1D4w9wYWuCP3yemsIsdUFYUMSnqzPM7Ds9jkbae4otyoYVQUje1WwovHkITKQE8wxAgj00ya9brMP4',
            // customerEphemeralKeySecret: response?.data?.ephemeralKey,
            paymentIntentClientSecret: response?.data?.client_secret,
            merchantDisplayName: 'Opravits',
            googlePay: true,
            googlePay: {
              merchantCountryCode: 'US',
              testEnv: true, // use test environment
            },
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
              name: 'Opravits',
            },
          });
          if (error) {
            console.log('err: ', error);
          } else {
            const {error} = await presentPaymentSheet();
            if (error) {
              Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
              handleBuyNow(val?._id);
            }
          }
        }
      })
      .catch(e => {
        console.log('e', e?.response?.data);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header profile={true} />
      <AppLoader loading={loading} />
      <Text style={styles.heading}>Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgview}>
          <Image
            style={styles.img}
            source={profile?.url ? {uri: profile?.url} : Images?.user}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text
          style={{
            ...styles.name,
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginVertical: 0,
            marginBottom: 3,
          }}
          numberOfLines={1}>
          {`EMAIL: ${profile?.email}`}
        </Text>
        <Text
          style={{
            ...styles.name,
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginVertical: 0,
          }}>
          {`PHONE: ${profile?.mobile}`}
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
          {allPlans?.length ? (
            <View style={styles.planrow}>
              {allPlans?.map((item, index) => {
                return (
                  <StripeProvider
                    key={index}
                    publishableKey="pk_test_51MgOkDFWfgPTBcgnMniyJ9wpe4gDvbpDfOc1hV6uqx44VzFeIRLb5vRqeBJrnepwsQ0HfppxgHs81Y6vLVqVz1r300Z6JcGO4U">
                    <Plan
                      onPress={() => handlePayment(item)}
                      // onPress={() => handleBuyNow(item?._id)}
                      title={item?.name}
                      status={item?.button}
                    />
                  </StripeProvider>
                );
              })}
            </View>
          ) : (
            <Text style={styles.nodata}>No Plans Available</Text>
          )}
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
  nodata: {
    color: theme.primary,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    alignSelf: 'center',
    marginHorizontal: theme.wp('3%'),
    marginTop: theme.hp('2%'),
    marginBottom: theme.hp('3%'),
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: theme.wp('85%'),
  },
});
