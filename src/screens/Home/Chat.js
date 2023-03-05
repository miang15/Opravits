import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {theme} from '../../utils/theme';
import {Images} from '../../constants/Images';
import {useDispatch, useSelector} from 'react-redux';
import {
  accessChatAction,
  setChatMessages,
} from '../../redux/HomeRedux/homeactions';

const Chat = ({navigation}) => {
  const allChats = useSelector(state => state.HomeReducer.allChats);
  const dispatch = useDispatch();
  console.log('allChats', allChats);

  const handleChatClick = async item => {
    dispatch(setChatMessages([]));
    dispatch(accessChatAction(item));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        profile={true}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <Text style={styles.heading}>CHATS</Text>
      <FlatList
        data={allChats}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => handleChatClick(item)}
              style={styles.row}>
              <View style={styles.imgview}>
                <Image
                  style={styles.img}
                  source={{uri: item?.url}}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.name} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default Chat;

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
    width: '82%',
  },
});
