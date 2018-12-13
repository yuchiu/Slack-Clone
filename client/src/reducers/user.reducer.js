import actionTypes from "@/actionTypes";

const initialState = {
  currentUser: {},
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.USER_FETCH_TRY_AUTO_SIGNIN:
      newState.currentUser = action.payload.user;
      return newState;

    case actionTypes.USER_FETCH_SIGNIN:
      newState.isLoading = true;
      return newState;

    case actionTypes.USER_FETCH_SIGNIN_SUCCESS:
      newState.currentUser = action.payload.user;
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_EDIT:
      newState.isLoading = true;
      return newState;

    case actionTypes.USER_FETCH_EDIT_SUCCESS:
      newState.isLoading = false;
      newState.currentUser = action.payload.user;
      return newState;

    case actionTypes.ERROR_USER:
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};
