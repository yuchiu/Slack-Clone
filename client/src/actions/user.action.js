import constants from "@/constants";
import { userService } from "./services";

export default {
  autoAuth: () => async dispatch => {
    const response = await userService.autoAuth();
    const { data } = response;
    dispatch({
      type: constants.AUTO_LOGIN,
      payload: data
    });
  },

  registerUser: credentials => async dispatch => {
    try {
      const response = await userService.registerUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN_USER,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },

  loginUser: credentials => async dispatch => {
    try {
      const response = await userService.loginUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN_USER,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data
      });
    }
  },

  logoutUser: () => dispatch => {
    dispatch({
      type: constants.LOGOUT_USER
    });
  }
};
