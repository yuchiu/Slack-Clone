import validator from "validator";

export default (fieldName, data) => {
  let error;
  switch (fieldName) {
    case "username":
      if (!data) {
        error = "rsername can't be blank";
      }
      if (data.length < 4 || data.length > 32) {
        error = "length of username have to be between 4 to 32";
      }
      if (!/^[a-z0-9]+$/i.test(data)) {
        error =
          "only number and characters, special characters and space are not allowed";
      }
      return error;

    case "password":
      if (!data) {
        error = "password can't be blank";
      }
      if (data.length < 4 || data.length > 32) {
        error = "length of password have to be between 4 to 32";
      }
      return error;

    case "email":
      if (!validator.isEmail(data)) {
        error = "invalid email";
      }
      return error;

    case "feeling":
      if (data.length > 32) {
        error = "length of feeling can not exceed 32 characters";
      }
      return error;

    case "aboutMe":
      if (data.length > 258) {
        error = "length of about me can not exceed 258 characters";
      }
      return error;

    case "topic":
      if (data.length > 128) {
        error = "length of topic can not exceed 128 characters";
      }
      return error;

    case "purpose":
      if (data.length > 256) {
        error = "length of purpose can not exceed 256 characters";
      }
      return error;

    case "teamname":
      if (!data) {
        error = "team name can't be blank";
      }
      if (data.length < 1 || data.length > 32) {
        error = "length of team name have to be between 1 to 32";
      }
      return error;

    case "channelName":
      if (!data) {
        error = "channel name can't be blank";
      }
      if (data.length < 1 || data.length > 32) {
        error = "length of channel name have to be between 1 to 32";
      }
      return error;

    case "about":
      if (data.length > 128) {
        error = "length of about can not exceed 128 characters";
      }
      return error;

    default:
      return error;
  }
};
