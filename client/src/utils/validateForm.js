import Validator from "validator";

export default {
  login: data => {
    const fieldErrors = {};
    if (!data.username) {
      fieldErrors.username = "Username can't be blank";
    }
    if (data.username.length < 4 || data.username.length > 32) {
      fieldErrors.username = "Length of user name have to be between 4 to 32";
    }
    if (!/^[a-z0-9]+$/i.test(data.username)) {
      fieldErrors.username =
        "only number and characters, special characters and space are not allowed";
    }
    if (!data.password) {
      fieldErrors.password = "Password can't be blank";
    }
    if (data.password.length < 4 || data.password.length > 32) {
      fieldErrors.password = "Length of user name have to be between 4 to 32";
    }
    return fieldErrors;
  },

  register: data => {
    const fieldErrors = {};
    if (!data.username) {
      fieldErrors.username = "Username can't be blank";
    }
    if (data.username.length < 4 || data.username.length > 32) {
      fieldErrors.username = "Length of user name have to be between 4 to 32";
    }
    if (!/^[a-z0-9]+$/i.test(data.username)) {
      fieldErrors.username =
        "only number and characters, special characters and space are not allowed";
    }
    if (!data.password) {
      fieldErrors.password = "Password can't be blank";
    }
    if (data.password.length < 4 || data.password.length > 32) {
      fieldErrors.password = "Length of password have to be between 4 to 32";
    }
    if (!data.confirmPassword) {
      fieldErrors.confirmPassword = "Confirm password can't be blank";
    }
    if (data.password !== data.confirmPassword) {
      fieldErrors.confirmPassword =
        "Password and confirm password have to be the same";
    }
    if (!data.email) {
      fieldErrors.email = "Email can't be blank";
    }
    if (!Validator.isEmail(data.email)) {
      fieldErrors.email = "Invalid email";
    }
    return fieldErrors;
  },
  createTeam: data => {
    const fieldErrors = {};
    if (!data.name) {
      fieldErrors.name = "Team name can't be blank";
    }
    if (data.name.length < 1 || data.name.length > 32) {
      fieldErrors.name = "Length of team name have to be between 1 to 32";
    }
    if (data.about.length > 128) {
      fieldErrors.about = "Length of about have to be less than 128";
    }
    return fieldErrors;
  },

  addChannel: data => {
    const fieldErrors = {};
    if (!data.channelName) {
      fieldErrors.channelName = "Channel name can't be blank";
    }
    if (data.channelName.length < 1 || data.channelName.length > 32) {
      fieldErrors.channelName =
        "Length of channel name have to be between 1 to 32";
    }
    if (!/^[a-z0-9]+$/i.test(data.channelName)) {
      fieldErrors.channelName =
        "only number and characters, special characters and space are not allowed";
    }
    if (data.purpose.length > 256) {
      fieldErrors.purpose = "Length of purpose can not exceed 256 characters";
    }
    if (data.isChannelPrivate) {
      if (data.members.length < 1) {
        fieldErrors.members = "At least one member have to be selected";
      }
    }
    return fieldErrors;
  },

  inviteToTeam: (data, currentTeamMemberList) => {
    const fieldErrors = {};
    const isMember = (formUsername, teamMembers) => {
      const findMember = teamMembers.filter(
        member => member.username === formUsername
      );
      if (findMember.length > 0) return true;
      return false;
    };
    if (!data.username) {
      fieldErrors.username = "Username can't be blank";
    }
    if (data.username.length < 1 || data.username.length > 32) {
      fieldErrors.username = "Length of username have to be between 1 to 32";
    }
    if (isMember(data.username, currentTeamMemberList)) {
      fieldErrors.username = `${data.username} is already member of the team`;
    }
    if (!/^[a-z0-9]+$/i.test(data.username)) {
      fieldErrors.username =
        "only number and characters, special characters and space are not allowed";
    }
    return fieldErrors;
  },

  addMessageGroup: data => {
    const fieldErrors = {};
    if (data.members.length < 1) {
      fieldErrors.members = "At least one member have to be selected";
    }
    return fieldErrors;
  },
  editTopic: data => {
    const fieldErrors = {};
    if (data.text.length > 128) {
      fieldErrors.text = "Length of topic can not exceed 128 characters";
    }
    return fieldErrors;
  },
  editPurpose: data => {
    const fieldErrors = {};
    if (data.text.length > 256) {
      fieldErrors.text = "Length of purpose can not exceed 256 characters";
    }
    return fieldErrors;
  },
  editFeeling: data => {
    const fieldErrors = {};
    if (data.text.length > 32) {
      fieldErrors.text = "Length of feeling can not exceed 32 characters";
    }
    return fieldErrors;
  },
  editProfile: data => {
    const fieldErrors = {};
    if (data.feeling.length > 32) {
      fieldErrors.feeling = "Length of feeling can not exceed 32 characters";
    }
    if (data.about.length > 256) {
      fieldErrors.feeling = "Length of about can not exceed 256 characters";
    }
    if (data.password) {
      if (data.password.length < 4 || data.password.length > 32) {
        fieldErrors.password = "Length of password have to be between 4 to 32";
      }
      if (data.newPassword.length < 4 || data.newPassword.length > 32) {
        fieldErrors.newPassword =
          "Length of password have to be between 4 to 32";
      }
      if (!data.confirmPassword) {
        fieldErrors.confirmPassword = "Confirm password can't be blank";
      }
      if (data.password !== data.confirmPassword) {
        fieldErrors.confirmPassword =
          "Password and confirm password have to be the same";
      }
    }
    return fieldErrors;
  }
};
