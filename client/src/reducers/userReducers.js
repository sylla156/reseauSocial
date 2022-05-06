import { ADD_NEW_USER, VERIFY_IF_USER_CONNECT } from "../Actions/userAction";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return { ...action.payload };
      break;

    case VERIFY_IF_USER_CONNECT:
      return { ...action.payload };
      break;

    default:
      return state;
      break;
  }
};
