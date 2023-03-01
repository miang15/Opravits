import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import PhoneInput from 'react-native-phone-number-input';
import CustomButton from '../../components/CustomButton';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import Header from '../../components/Header';
import CustomInput from '../../components/CustomInput';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const phoneInputRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState({type: '', msg: ''});

  const handleGetOTP = async () => {
    if (!phone) {
      setError({
        type: 'phone',
        msg: 'Phone Number is Required.',
      });
    } else {
      setLoading(true);
      var num = phone.substring(1);
      const data = {
        mobile: num,
      };
      const otpRes = await http.post('user/otp', data);

      if (otpRes?.data) {
        setLocalStorage('token', otpRes?.data?.token);
        navigation.replace('VerifyOTP', {
          userData: data,
          endPoint: 'user/login',
        });
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLoader loading={loading} />
      <Header />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>LOGIN TO CONTINUE</Text>
        <CustomInput
          placeholder={'ENTER PHONE/EMAIL'}
          value={email}
          onChangeText={setEmail}
        />
        {error?.type == 'email' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <CustomInput
          customStyle={{marginTop: responsiveSize(15)}}
          placeholder={'PASSWORD'}
          value={email}
          onChangeText={setEmail}
          secureTextEntry={true}
        />
        {error?.type == 'password' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}

        <CustomButton
          onPress={handleGetOTP}
          title={'LOGIN'}
          customStyle={{marginTop: '5%'}}
        />
        <Text
          onPress={() => navigation.navigate('About')}
          style={styles.account}>
          NEW USER ? REGISTER
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(15),
    marginTop: responsiveSize(25),
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(8),
  },
  desc: {
    color: theme.white,
    fontFamily: theme.interbold,
    marginTop: responsiveSize(15),
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(12),
  },
  bottomView: {
    marginTop: responsiveSize(80),
    paddingHorizontal: 15,
  },
  text: {
    color: theme.black,
    fontSize: responsiveSize(11),
    textAlign: 'center',
    marginHorizontal: responsiveSize(10),
    fontFamily: theme.interbold,
    borderBottomWidth: 1,
    borderColor: theme.text.gray,
  },
  errorMsg: {
    marginHorizontal: responsiveSize(15),
    fontSize: responsiveSize(10),
    color: theme.text.red,
    fontFamily: theme.interbold,
  },
  account: {
    color: theme.black,
    fontFamily: theme.interbold,
    textAlign: 'center',
    margin: responsiveSize(15),
    fontSize: responsiveSize(12),
  },
});
