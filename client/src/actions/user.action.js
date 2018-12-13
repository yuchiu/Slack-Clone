import actionTypes from "@/actionTypes";
import { userService } from "./services";

export default {
  /**
   * fetch API with Axios
   */
  fetchTryAutoSignIn: () => async dispatch => {
    const response = await userService.fetchTryAutoSignIn();
    const { data } = response;
    dispatch({
      type: actionTypes.USER_FETCH_TRY_AUTO_SIGNIN,
      payload: data
    });
  },

  fetchEditUser: editUserdata => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_EDIT
    });
    try {
      const response = await userService.fetchEditUser(editUserdata);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_EDIT_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_USER,
        payload: data.meta.message
      });
    }
  },

  fetchSignUpUser: credentials => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    try {
      const response = await userService.fetchSignUpUser(credentials);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchSignInUser: credentials => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    try {
      const response = await userService.fetchSignInUser(credentials);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchOAuthLogin: credentials => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_SIGNIN
    });
    try {
      const response = await userService.fetchOAuthLogin(credentials);
      const { data } = response;
      dispatch({
        type: actionTypes.USER_FETCH_SIGNIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchSignOutUser: () => async dispatch => {
    dispatch({
      type: actionTypes.USER_FETCH_SIGNOUT
    });
    try {
      await userService.fetchSignOutUser();
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: actionTypes.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  }
};
