import {HOME_ACTION_TYPES} from './homeactions';

const initialState = {
  category: [],
  business: [],
  allChats: [],
  allMessages: [],
  currentChat: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_ACTION_TYPES.SET_CATEGORY:
      return {
        ...state,
        category: [...action.payload],
      };
    case HOME_ACTION_TYPES.SET_BUSINESS:
      return {
        ...state,
        business: [...action.payload],
      };
    case HOME_ACTION_TYPES.SET_CHAT_MESSAGES:
      return {
        ...state,
        allMessages: [...action.payload],
      };
    case HOME_ACTION_TYPES.UPDATE_CHAT_MESSAGES:
      return {
        ...state,
        allMessages: [...state.allMessages, action.payload],
      };
    case HOME_ACTION_TYPES.SET_CHAT:
      return {
        ...state,
        allChats: [...action.payload],
      };
    case HOME_ACTION_TYPES.SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: {...action.payload},
      };

    default:
      return state;
  }
};

export default HomeReducer;
