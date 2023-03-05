import http from '../../api/http';
import * as RootNavigation from '../../navigation/RootNavigator';
import {getLocalStorage} from '../../utils/actions';

export const HOME_ACTION_TYPES = {
  SET_CATEGORY: 'SET_CATEGORY',
  SET_BUSINESS: 'SET_BUSINESS',
  SET_CHAT: 'SET_CHAT',
  SET_CHAT_MESSAGES: 'SET_CHAT_MESSAGES',
  UPDATE_CHAT_MESSAGES: 'UPDATE_CHAT_MESSAGES',
  SET_CURRENT_CHAT: 'SET_CURRENT_CHAT',
};

export const setHomeCategory = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.SET_CATEGORY,
      payload: payload,
    });
  };
};

export const setCurrentChat = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.SET_CURRENT_CHAT,
      payload: payload,
    });
  };
};

export const setChatMessages = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.SET_CHAT_MESSAGES,
      payload: payload,
    });
  };
};

export const UpdatChatMessages = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.UPDATE_CHAT_MESSAGES,
      payload: payload,
    });
  };
};

export const setAllChat = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.SET_CHAT,
      payload: payload,
    });
  };
};

export const setBusiness = payload => {
  return dispatch => {
    return dispatch({
      type: HOME_ACTION_TYPES.SET_BUSINESS,
      payload: payload,
    });
  };
};

export const getCategoryAction = () => async dispatch => {
  try {
    const categoryRes = await http.get('user/allcategory');
    if (categoryRes?.data?.success) {
      dispatch(setHomeCategory(categoryRes?.data?.category));
    }
  } catch (error) {}
};

export const getBusinessAction = url => async dispatch => {
  try {
    const allbusinessRes = await http.get(url);
    if (allbusinessRes?.data?.success) {
      dispatch(setBusiness(allbusinessRes?.data?.data));
    }
  } catch (error) {}
};

export const accessChatAction = payload => async dispatch => {
  try {
    const accessRes = await http.post('chat/accesschat', {
      userId: payload?._id,
    });

    if (accessRes?.data) {
      sendMessage(accessRes?.data?._id);
      dispatch(setCurrentChat(accessRes?.data));
      dispatch(addClickChatAction(payload, accessRes?.data?._id));
    }
  } catch (error) {}
};

export const sendMessage = payload => async dispatch => {
  try {
    const sendRes = await http.post('message/sendmsg', {
      content: 'Hello',
      chatId: payload,
    });
    if (sendRes?.data) {
      dispatch(UpdatChatMessages(sendRes?.data));
    }
  } catch (error) {}
};

export const addClickChatAction = (payload, chatID) => async dispatch => {
  try {
    const addClickRes = await http.post('user/addclick', {id: payload?._id});
    RootNavigation.navigate('Messages', {user: payload});
  } catch (error) {}
};

export const allMessageAction = chatID => async dispatch => {
  try {
    const messageRes = await http.post('message/allmsgs', {
      chatId: chatID,
    });

    if (messageRes?.data) {
      dispatch(setChatMessages(messageRes?.data));
    }
  } catch (error) {}
};

export const allChats = () => async dispatch => {
  try {
    const user = await getLocalStorage('userData');
    const parseData = JSON.parse(user);
    const chatRes = await http.get('chat/allchats');
    if (chatRes?.data) {
      let arr = [];
      chatRes?.data?.forEach(item => {
        item?.users?.forEach(val => {
          if (val?._id !== parseData?._id) {
            arr.push(val);
          }
        });
      });

      dispatch(setAllChat(arr));
    }
  } catch (error) {}
};
