const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_USER":
      return { ...action.payload };
      break;

    default:
      return state;
      break;
  }
};
