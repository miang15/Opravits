import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {responsiveSize, theme} from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import http from '../../api/http';
import {setLocalStorage} from '../../utils/actions';
import {useDispatch} from 'react-redux';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import PhoneInput from 'react-native-phone-number-input';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Header from '../../components/Header';

const About = ({navigation}) => {
  const dispatch = useDispatch();
  const phoneInputRef = useRef();
  const [value, setValue] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePic, setImagePic] = useState('');
  const [picBase64, setPicBase64] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({type: '', msg: ''});
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleRegister = async () => {
    setError({type: '', msg: ''});

    if (!imagePic) {
      setError({
        type: 'pic',
        msg: 'Profile photo is Required.',
      });
    } else if (!name) {
      setError({
        type: 'name',
        msg: 'Name is Required.',
      });
    } else if (!email) {
      setError({
        type: 'email',
        msg: 'Email is Required',
      });
    } else if (!email.match(emailRegex)) {
      setError({
        type: 'email',
        msg: 'Email is Invalid',
      });
    } else if (!phone) {
      setError({
        type: 'phone',
        msg: 'Phone Number is Required.',
      });
    } else {
      setLoading(true);
      var num = phone.substring(1);
      const data = {
        name: name,
        mobile: num,
        email: email,
        profile: picBase64,
      };
      const otpRes = await http.post('user/otp', {mobile: num});
      console.log('otpRes', otpRes?.data);
      if (otpRes?.data?.token) {
        setLocalStorage('token', otpRes?.data?.token);
        navigation.navigate('VerifyOTP', {
          userData: data,
          endPoint: 'user/register',
        });
      }
      setLoading(false);
    }
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(async image => {
        const base64 = await RNFS.readFile(image?.path, 'base64');
        const readyImage = `data:${image?.mime};base64,` + base64;
        setImagePic(image?.path);
        setPicBase64(readyImage);
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <AppLoader loading={loading} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>REGISTER TO CONTINUE</Text>
        <TouchableOpacity onPress={handleImage} style={styles.uploadview}>
          {imagePic ? (
            <Image
              source={{uri: imagePic}}
              style={styles.img}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.upload}>UPLOAD{'\n'}PHOTO</Text>
          )}
        </TouchableOpacity>
        {error?.type == 'pic' ? (
          <Text style={{...styles.errorMsg, textAlign: 'center'}}>
            {error?.msg}
          </Text>
        ) : null}
        <CustomInput
          customStyle={{marginTop: responsiveSize(25)}}
          placeholder={'ENTER NAME'}
          value={name}
          onChangeText={setName}
        />
        {error?.type == 'name' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <CustomInput
          placeholder={'ENTER EMAIL'}
          value={email}
          onChangeText={setEmail}
        />
        {error?.type == 'email' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}
        <PhoneInput
          ref={phoneInputRef}
          textInputStyle={{
            color: theme.black,
            paddingVertical: 0,
          }}
          codeTextStyle={{
            color: theme.black,
            marginRight: 5,
          }}
          textContainerStyle={{
            paddingVertical: 0,
            height: 40,
            borderBottomWidth: 0,
            paddingHorizontal: 5,
            borderColor: theme.black,
            backgroundColor: theme.white,
            overflow: 'hidden',
          }}
          flagButtonStyle={{
            borderRightWidth: 1,
            alignSelf: 'flex-start',
            width: '18%',
            borderColor: theme.black,
          }}
          containerStyle={[
            {
              paddingVertical: 0,
              borderWidth: 1,
              borderColor: theme.black,
              alignSelf: 'center',
              width: '90%',
              height: responsiveSize(45),
              marginVertical: '3%',
              borderRadius: 10,
              overflow: 'hidden',
            },
          ]}
          defaultValue={value}
          defaultCode={'IN'}
          layout="first"
          onChangeFormattedText={val => {
            const checkValid = phoneInputRef.current?.isValidNumber(val);

            if (checkValid) {
              setPhone(val);
              setError({
                type: '',
                msg: '',
              });
            } else {
              setError({
                type: 'phone',
                msg: 'Phone Number is Invalid',
              });
            }
          }}
        />
        {error?.type == 'phone' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}

        <CustomInput
          placeholder={'PASSWORD'}
          placeholderTextColor={theme.text.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {error?.type == 'password' ? (
          <Text style={styles.errorMsg}>{error?.msg}</Text>
        ) : null}

        <CustomButton
          onPress={handleRegister}
          title={'REGISTER'}
          customStyle={{marginTop: '5%'}}
        />
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.account}>
          EXISTING USER ? LOGIN
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  uploadview: {
    borderWidth: 0.8,
    borderColor: theme.text.gray,
    width: responsiveSize(100),
    height: responsiveSize(100),
    borderRadius: 100,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: responsiveSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  upload: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(12),
    textAlign: 'center',
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: responsiveSize(15),
    marginTop: responsiveSize(25),
    marginHorizontal: responsiveSize(15),
    marginBottom: responsiveSize(8),
  },
  account: {
    color: theme.black,
    fontFamily: theme.interbold,
    textAlign: 'center',
    margin: responsiveSize(15),
    fontSize: responsiveSize(12),
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
