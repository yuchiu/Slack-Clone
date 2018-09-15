import constants from "@/constants";

const initialState = {
  messageGroupList: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.error = "";
      newState.messageGroupList = action.payload.messageGroupList;
      return newState;

    case constants.CREATE_MESSAGE_GROUP:
      newState.error = "";
      newState.messageGroupList = action.payload.messageGroupList;
      return newState;

    case constants.MESSAGE_GROUP_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
