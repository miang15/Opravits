import {combineReducers} from 'redux';
import AuthReducer from './Auth/authreducer';
import AppReducer from './AppRedux/appreducer';

const reducers = combineReducers({
  AuthReducer: AuthReducer,
  AppReducer: AppReducer,
});

export const RootReducer = (state, action) => {
  //Reset Global state

  return reducers(state, action);
};
