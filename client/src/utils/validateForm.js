import Validator from "validator";

export default {
  login: data => {
    const clientErrors = {};
    if (!data.username) {
      clientErrors.username = "Can't be blank";
    } else if (data.username.length < 4 || data.username.length > 32) {
      clientErrors.username = "Length of user name have to be between 4 to 32";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 32) {
      clientErrors.password = "Length of user name have to be between 4 to 32";
    }
    return clientErrors;
  },
  register: data => {
    const clientErrors = {};
    if (!data.username) {
      clientErrors.username = "Can't be blank";
    } else if (data.username.length < 4 || data.username.length > 32) {
      clientErrors.username = "Length of user name have to be between 4 to 32";
    }
    if (!data.password) {
      clientErrors.password = "Can't be blank";
    } else if (data.password.length < 4 || data.password.length > 32) {
      clientErrors.password = "Length of password have to be between 4 to 32";
    }
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    return clientErrors;
  },
  addChannel: data => {
    const clientErrors = {};
    if (!data.name) {
      clientErrors.name = "Can't be blank";
    } else if (data.name.length < 1 || data.name.length > 32) {
      clientErrors.name = "Length of channel name have to be between 1 to 32";
    }
    return clientErrors;
  },
  createTeam: data => {
    const clientErrors = {};
    if (!data.name) {
      clientErrors.name = "Can't be blank";
    } else if (data.name.length < 1 || data.name.length > 32) {
      clientErrors.name = "Length of team name have to be between 1 to 32";
    }
    return clientErrors;
  },
  invitePeople: data => {
    const clientErrors = {};
    if (!data.email) {
      clientErrors.email = "Can't be blank";
    } else if (!Validator.isEmail(data.email)) {
      clientErrors.email = "Invalid email";
    }
    return clientErrors;
  }
};
