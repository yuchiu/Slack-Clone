import constants from "@/constants";
import { userService } from "./services";

export default {
  fetchAutoAuth: () => async dispatch => {
    const response = await userService.fetchAutoAuth();
    const { data } = response;
    dispatch({
      type: constants.USER_FETCH_AUTO_LOGIN,
      payload: data
    });
  },

  fetchEditUser: editUserdata => async dispatch => {
    try {
      const response = await userService.fetchEditUser(editUserdata);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_EDIT,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchRegisterUser: credentials => async dispatch => {
    dispatch({
      type: constants.USER_FETCH_LOGIN
    });
    try {
      const response = await userService.fetchRegisterUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_LOGIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchLoginUser: credentials => async dispatch => {
    dispatch({
      type: constants.USER_FETCH_LOGIN
    });
    try {
      const response = await userService.fetchLoginUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_LOGIN_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  },

  fetchLogoutUser: () => async dispatch => {
    try {
      await userService.fetchLogoutUser();
      dispatch({
        type: constants.USER_FETCH_LOGOUT
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  }
};
