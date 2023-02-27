import {initSocket} from '../../utils/socketHelper';
// import PushNotification from 'react-native-push-notification';

export const APP_ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_TOAST: 'SET_TOAST',
  SET_NOTIFICATION: 'SET_NOTIFICATION',
};

export const setLoadingAction = payload => {
  return dispatch => {
    return dispatch({
      type: APP_ACTION_TYPES.SET_LOADING,
      payload,
    });
  };
};

export const setToastAction = payload => {
  return dispatch => {
    return dispatch({
      type: APP_ACTION_TYPES.SET_TOAST,
      payload: payload,
    });
  };
};

// export const showPushNotification = message => {
//   PushNotification.localNotification({
//     title: message,
//   });
// };

// export const socketMiddleware = store => next => async action => {
//   if (action.type === 'INIT_SOCKET') {
//     const socket = await initSocket();
//     socket.on('notification', (Message, url) => {
//       PushNotification.configure({
//         onNotification: showPushNotification(Message),
//       });
//       store.dispatch({
//         type: APP_ACTION_TYPES.SET_NOTIFICATION,
//         payload: {Message: Message, url: url},
//       });
//     });
//   }
//   return next(action);
// };
