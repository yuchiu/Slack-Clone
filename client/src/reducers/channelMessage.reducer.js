import constants from "@/constants";

const initialState = {
  channelMessageList: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_CHANNEL_MESSAGE_LIST:
      newState.channelMessageList = action.payload.channelMessageList;
      newState.error = "";
      return newState;

    case constants.CHANNEL_MESSAGE_ERROR:
      newState.error = action.payload.error;
      return newState;

    default:
      return state;
  }
};
