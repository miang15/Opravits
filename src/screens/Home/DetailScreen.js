import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../utils/theme';
import Header from '../../components/Header';
import {Images} from '../../constants/Images';
import {useRoute} from '@react-navigation/native';
import {AppLoader} from '../../components/AppLoader/AppLoader';
import {
  accessChatAction,
  setChatMessages,
} from '../../redux/HomeRedux/homeactions';
import {useDispatch} from 'react-redux';

const DetailScreen = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const details = route?.params?.details;
  const [loading, setLoading] = useState(false);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{details?.category}</Text>
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            source={{uri: details?.url}}
            resizeMode="cover"
          />
        </View>
        <Text
          style={{...styles.name, marginTop: theme.hp('2.5%')}}
          numberOfLines={1}>
          {'BUSINESS Name'}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {details?.name}
        </Text>
        <Text
          style={{...styles.name, marginTop: theme.hp('2.5%')}}
          numberOfLines={1}>
          {'BUSINESS ADDRESS'}
        </Text>
        <Text style={styles.name}>{details?.address}</Text>
        <Text
          style={{...styles.name, marginTop: theme.hp('2.5%')}}
          numberOfLines={1}>
          {'BUSINESS DETAILS'}
        </Text>
        <Text style={styles.name}>{details?.description}</Text>
        <Text
          style={{...styles.name, marginTop: theme.hp('2.5%')}}
          numberOfLines={1}>
          {'BUSINESS PHONE'}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {details?.mobile}
        </Text>
      </ScrollView>

      <View style={styles.row1}>
        <Text style={styles.time} numberOfLines={1}>
          {details?.timings}
        </Text>
        <Text
          onPress={() => Linking.openURL(`tel:${details?.mobile}`)}
          style={styles.detail}>
          CALL
        </Text>
        <Text onPress={() => handleChatClick(details)} style={styles.chat}>
          CHAT
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  line: {
    borderWidth: 0.6,
    marginBottom: theme.hp('2%'),
    borderColor: theme.text.gray,
    marginTop: theme.hp('5%'),
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    textAlign: 'center',
    marginVertical: theme.hp(1.5),
  },
  imgView: {
    width: theme.wp('85%'),
    height: theme.hp('25%'),
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  name: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp('2%'),
    marginHorizontal: '4%',
    marginBottom: '2%',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.wp('3%'),
    marginBottom: theme.hp('1.5%'),
    width: '90%',
    borderTopWidth: 1,
    borderTopColor: theme.text.gray,
    paddingTop: 12,
    alignSelf: 'center',
  },
  time: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    width: '40%',
  },
  detail: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.5),
    width: '26%',
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
  chat: {
    backgroundColor: theme.primary,
    color: theme.white,
    fontFamily: theme.interbold,
    fontSize: theme.hp(1.5),
    width: '26%',
    textAlign: 'center',
    paddingVertical: 8,
    borderRadius: 5,
  },
});
