import axios from 'axios';
import {getLocalStorage} from '../utils/actions';
import {setLoadingAction, setToastAction} from '../redux/AppRedux/appactions';
import {store} from '../redux/store';
import {showMessage} from 'react-native-flash-message';

export const BASE_URL = `http://ec2-13-233-125-111.ap-south-1.compute.amazonaws.com:5001/api/`;

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  async config => {
    //token
    const token = await getLocalStorage('token');

    config.headers['Authentication'] = `${token}`;
    config.headers['otp-token'] = `${token}`;
    return config;
  },
  err => Promise.reject(err),
);

const ResponseInterceptor = response => {
  store.dispatch(setLoadingAction(false));
  return response;
};

http.interceptors.response.use(ResponseInterceptor, err => {
  const error = err?.response?.data || err;
  store.dispatch(setLoadingAction(false));

  if (err?.response?.config?.url == 'user/addclick') {
    console.log('ignore');
  } else if (err?.response?.config?.url == 'message/allmsgs') {
    console.log('ignore all msg', err?.response?.data);
  } else if (error?.message?.message) {
    console.log('err message', error?.message);
  } else if (error?.message) {
    showMessage({
      message: 'Error',
      description: error?.message,
      type: 'danger',
      duration: 1500,
    });
    // Alert.alert('Error', error?.message);
  }

  return err;
});

export default http;
