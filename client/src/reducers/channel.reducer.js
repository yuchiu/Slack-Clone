import constants from "@/constants";

const initialState = {
  channelList: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.error = "";
      newState.channelList = action.payload.channelList;
      return newState;

    default:
      return state;
  }
};
