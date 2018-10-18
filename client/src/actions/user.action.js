import constants from "@/constants";
import { userService } from "./services";

export default {
  /**
   * fetch API with Axios
   */
  fetchAutoAuth: () => async dispatch => {
    const response = await userService.fetchAutoAuth();
    const { data } = response;
    dispatch({
      type: constants.USER_FETCH_AUTO_LOGIN,
      payload: data
    });
  },

  fetchEditUser: editUserdata => async dispatch => {
    dispatch({
      type: constants.USER_FETCH_EDIT
    });
    try {
      const response = await userService.fetchEditUser(editUserdata);
      const { data } = response;
      dispatch({
        type: constants.USER_FETCH_EDIT_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_USER,
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
    dispatch({
      type: constants.USER_FETCH_LOGOUT
    });
    try {
      await userService.fetchLogoutUser();
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_AUTH,
        payload: data.meta.message
      });
    }
  }
};
