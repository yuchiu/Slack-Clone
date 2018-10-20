import constants from "@/constants";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMemberList: [],
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.CHANNEL_SWITCH:
      newState.currentChannel = state.channelList.find(
        channel => channel.id === action.payload
      );
      return newState;

    case constants.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channelList[0];
      return newState;

    case constants.CHANNEL_FETCH_CREATE:
      newState.isLoading = true;
      return newState;

    case constants.CHANNEL_FETCH_CREATE_SUCCESS:
      newState.isLoading = false;
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      newState.currentChannelMemberList = action.payload.channelMemberList;
      return newState;

    case constants.CHANNEL_FETCH_EDIT:
      newState.isLoading = true;
      return newState;

    case constants.CHANNEL_FETCH_EDIT_SUCCESS:
      newState.isLoading = false;
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      return newState;

    case constants.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.currentChannelMemberList = action.payload.channelMemberList;
      return newState;

    case constants.ERROR_CHANNEL:
      newState.isLoading = false;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
