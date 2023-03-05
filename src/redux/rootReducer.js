import {combineReducers} from 'redux';
import AuthReducer from './Auth/authreducer';
import AppReducer from './AppRedux/appreducer';
import HomeReducer from './HomeRedux/homereducer';

const reducers = combineReducers({
  AuthReducer: AuthReducer,
  AppReducer: AppReducer,
  HomeReducer: HomeReducer,
});

export const RootReducer = (state, action) => {
  //Reset Global state

  return reducers(state, action);
};
