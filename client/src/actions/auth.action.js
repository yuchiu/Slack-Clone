import constants from "@/constants";
import { authService } from "./services";

export default {
  fetchAutoAuth: () => async dispatch => {
    const response = await authService.fetchAutoAuth();
    const { data } = response;
    dispatch({
      type: constants.USER_AUTO_LOGIN_FETCH,
      payload: data
    });
  },

  fetchRegisterUser: credentials => async dispatch => {
    try {
      const response = await authService.fetchRegisterUser(credentials);
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
      const response = await authService.fetchLoginUser(credentials);
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
      await authService.fetchLogoutUser();
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
