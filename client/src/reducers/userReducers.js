import {
  ADD_NEW_PICTURE,
  ADD_NEW_USER,
  UPDATE_USER_INFO,
  VERIFY_IF_USER_CONNECT,
} from "../Actions/userAction";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return { ...action.payload };
      break;

    case VERIFY_IF_USER_CONNECT:
      return { ...action.payload };
      break;

    case ADD_NEW_PICTURE:
      return { ...action.payload };
      break;

    case UPDATE_USER_INFO:
      return { ...action.payload };
      break;

    default:
      return state;
      break;
  }
};
