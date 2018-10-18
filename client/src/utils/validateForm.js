export default {
  addChannel: data => {
    const fieldErrors = {};
    if (data.isChannelPrivate) {
      if (data.members.length < 1) {
        fieldErrors.members = "At least one member have to be selected";
      }
    }
    return fieldErrors;
  },

  addMessageGroup: data => {
    const fieldErrors = {};
    if (data.members.length < 1) {
      fieldErrors.members = "at least one member have to be selected";
    }
    return fieldErrors;
  },
  editProfile: data => {
    const fieldErrors = {};
    if (data.feeling.length > 32) {
      fieldErrors.feeling = "length of feeling can not exceed 32 characters";
    }
    if (data.aboutMe.length > 256) {
      fieldErrors.aboutMe = "length of about me can not exceed 256 characters";
    }
    if (data.isEditPasswordOn) {
      if (!data.password) {
        fieldErrors.password = "password cannot be empty";
      }
      if (data.password.length < 4 || data.password.length > 32) {
        fieldErrors.password = "length of password have to be between 4 to 32";
      }
      if (!data.newPassword) {
        fieldErrors.newPassword = "new password cannot be empty";
      }
      if (data.newPassword.length < 4 || data.newPassword.length > 32) {
        fieldErrors.newPassword =
          "length of password have to be between 4 to 32";
      }
      if (!data.confirmPassword) {
        fieldErrors.confirmPassword = "confirm password can't be blank";
      }
      if (data.confirmPassword.length < 4 || data.confirmPassword.length > 32) {
        fieldErrors.confirmPassword =
          "length of password have to be between 4 to 32";
      }
      if (data.newPassword !== data.confirmPassword) {
        fieldErrors.confirmPassword =
          "new password and confirm password have to be the same";
      }
    }
    return fieldErrors;
  }
};
