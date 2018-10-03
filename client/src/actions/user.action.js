import constants from "@/constants";
import { userService } from "./services";

export default {
  fetchAutoAuth: () => async dispatch => {
    const response = await userService.fetchAutoAuth();
    const { data } = response;
    dispatch({
      type: constants.USER_AUTO_LOGIN_FETCH,
      payload: data
    });
  },

  fetchEditUser: editUserdata => async dispatch => {
    try {
      const response = await userService.fetchEditUser(editUserdata);
      const { data } = response;
      dispatch({
        type: constants.USER_EDIT_FETCH,
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
    try {
      const response = await userService.fetchRegisterUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_LOGIN_FETCH,
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
    try {
      const response = await userService.fetchLoginUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.USER_LOGIN_FETCH,
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
        type: constants.USER_LOGOUT_FETCH
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
