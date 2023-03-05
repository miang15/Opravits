import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../components/Header';
import {theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {useRoute} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import io from 'socket.io-client';
import http from '../../api/http';
import {useDispatch, useSelector} from 'react-redux';
import {getLocalStorage} from '../../utils/actions';
import {
  UpdatChatMessages,
  allMessageAction,
} from '../../redux/HomeRedux/homeactions';
import {AppLoader} from '../../components/AppLoader/AppLoader';

const Messages = ({navigation}) => {
  const [socketconnected, setsocketconnected] = useState();
  const allMsg = useSelector(state => state.HomeReducer.allMessages);
  const currentChat = useSelector(state => state.HomeReducer.currentChat);
  const url = `http://ec2-13-233-125-111.ap-south-1.compute.amazonaws.com:5001`;
  let socket;

  const route = useRoute();
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const details = route?.params?.user;

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [first, setFirst] = useState(false);
  const [allMessage, setAllMessage] = useState([
    {
      id: 1,
      msg: 'Hello',
      userId: 1,
    },
    {
      id: 2,
      msg: 'Hy',
      userId: 2,
    },
    {
      id: 3,
      msg: 'How are you',
      userId: 1,
    },
    {
      id: 4,
      msg: 'I am fine',
      userId: 2,
    },
    {
      id: 1,
      msg: 'Hello',
      userId: 1,
    },
    {
      id: 2,
      msg: 'Hy',
      userId: 2,
    },
    {
      id: 3,
      msg: 'How are you',
      userId: 1,
    },
    {
      id: 4,
      msg: 'I am fine',
      userId: 2,
    },
    {
      id: 1,
      msg: 'Hello',
      userId: 1,
    },
    {
      id: 2,
      msg: 'Hy',
      userId: 2,
    },
    {
      id: 3,
      msg: 'How are you',
      userId: 1,
    },
    {
      id: 4,
      msg: 'I am fine',
      userId: 2,
    },
  ]);

  useEffect(() => {
    getUserData();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    socket = io(url);
    setsocketconnected(socket);
    socket?.emit('setup', userInfo);
  }, [userInfo]);

  const getUserData = async () => {
    const user = await getLocalStorage('userData');
    const parseData = JSON.parse(user);
    setUserInfo(parseData);
  };
  useEffect(() => {
    if (currentChat?._id !== 'none') {
      dispatch(allMessageAction(currentChat?._id));
      socketconnected?.emit('join chat', currentChat?._id);
    }
  }, [currentChat]);

  useEffect(() => {
    if (!first) {
      setFirst(true);
      socketconnected?.on('message received', messagerecieved => {
        if (
          currentChat?._id === 'none' ||
          currentChat?._id !== messagerecieved?.chat?._id
        ) {
          console.log('ifff new message', messagerecieved);
          // find the chat object with the given ID
        } else {
          dispatch(UpdatChatMessages(messagerecieved));
        }
      });
    }
  }, []);

  const sendMessage = async () => {
    const sendRes = await http.post('message/sendmsg', {
      content: msg,
      chatId: currentChat?._id,
    });

    if (sendRes?.data) {
      dispatch(UpdatChatMessages(sendRes?.data));
      // setAllMessage([...allMessage, {msg: msg}]);

      socketconnected?.emit('new message', sendRes?.data);
      setMsg('');
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        profile={true}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <AppLoader loading={loading} />
      <TouchableOpacity style={styles.row}>
        <View style={styles.imgview}>
          <Image
            style={styles.img}
            source={details?.url ? {uri: details?.url} : Images.thumbnail}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {details?.name}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${details?.mobile}`)}>
          <Image source={Images.call} />
        </TouchableOpacity>
      </TouchableOpacity>

      {allMsg?.length ? (
        <View style={{flex: 1}}>
          <FlatList
            style={styles.list}
            ref={flatListRef}
            inverted
            onContentSizeChange={scrollToBottom}
            onLayout={scrollToBottom}
            data={allMsg}
            renderItem={({item, index}) => {
              if (item?.sender?._id == userInfo?._id) {
                return <Text style={styles.sender}>{item?.content}</Text>;
              } else {
                return <Text style={styles.receiver}>{item?.content}</Text>;
              }
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
        </View>
      ) : null}
      <View
        style={
          allMsg?.length
            ? styles.sendrow
            : {...styles.sendrow, position: 'absolute', bottom: 0}
        }>
        <CustomInput
          value={msg}
          onChangeText={setMsg}
          placeholder={'Enter Message'}
          customStyle={{
            width: '85%',
            marginRight: '5%',
          }}
        />
        <TouchableOpacity disabled={!msg} onPress={sendMessage}>
          <Image source={Images.send} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  list: {
    marginTop: theme.hp('2%'),
    paddingHorizontal: theme.wp('5%'),
  },
  receiver: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    backgroundColor: theme.secondary,
    alignSelf: 'flex-start',
    paddingVertical: theme.hp('1.2%'),
    paddingHorizontal: theme.wp('4%'),
    borderRadius: 8,
    marginBottom: theme.hp('1.5%'),
  },
  sender: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    backgroundColor: theme.secondary,
    alignSelf: 'flex-end',
    paddingVertical: theme.hp('1.2%'),
    paddingHorizontal: theme.wp('4%'),
    borderRadius: 8,
    marginBottom: theme.hp('1.5%'),
  },
  heading: {
    color: theme.black,
    fontFamily: theme.interbold,
    fontSize: theme.hp(2),
    marginHorizontal: theme.wp('5%'),
    marginVertical: theme.hp(1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: theme.black,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: theme.wp('90%'),
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: theme.hp('1.5%'),
  },
  imgview: {
    width: 45,
    height: 45,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
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
    width: '75%',
  },
  sendrow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.wp('5%'),
    marginTop: theme.hp('2%'),
    paddingBottom: theme.hp('2%'),
    // position: 'absolute',
    // bottom: 0,
    alignSelf: 'center',
    backgroundColor: theme.white,
    width: theme.wp('95%'),
  },
});
