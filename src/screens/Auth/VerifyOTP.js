import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLoggedAction, verifyOTPAction} from '../../redux/Auth/authactions';
import {AppLoader} from '../../components/AppLoader/AppLoader';

const VerifyOTP = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const user = route?.params?.userData;
  const url = route?.params?.endPoint;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState({type: '', msg: ''});

  const handleVerify = async () => {
    setError({type: '', msg: ''});
    if (!otp) {
      setError({
        type: 'otp',
        msg: 'OTP is Required.',
      });
    } else {
      setLoading(true);
      const data = {
        ...user,
        otp: otp,
      };
      const registerRes = await http.post(url, data);
      console.log('registerRes', registerRes?.data);
      if (registerRes?.data?.token) {
        dispatch(userLoggedAction(true));
        setLocalStorage('token', registerRes?.data?.token);
        setLocalStorage('loggedIn', registerRes?.data?.token);
        navigation.replace('BottomTab');
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.black} barStyle={'light-content'} />
      <AppLoader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>AUTHENTICATION</Text>
        <Text style={styles.desc}>ENTER THE OTP SENT TO YOUR WHATSAPP</Text>
        <CustomInput
          flag={false}
          placeholder={'* * * * * *'}
          placeholderTextColor={theme.text.gray}
          value={otp}
          onChangeText={setOtp}
        />
        {error?.type == 'otp' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}

        <CustomButton
          onPress={handleVerify}
          title={'FINISH'}
          customStyle={{marginTop: '5%'}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.black,
  },
  heading: {
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(20),
    marginTop: responsiveSize(25),
    marginHorizontal: responsiveSize(15),
  },
  desc: {
    color: theme.white,
    fontFamily: theme.interbold,
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(12),
  },

  errorMsg: {
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(10),
    color: theme.text.red,
    fontFamily: theme.interbold,
  },
});
