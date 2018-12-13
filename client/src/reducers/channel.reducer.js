import actionTypes from "@/actionTypes";

const initialState = {
  channelList: [],
  currentChannel: {},
  currentChannelMemberList: [],
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.CHANNEL_SWITCH:
      newState.currentChannel = state.channelList.find(
        channel => channel.id === action.payload
      );
      return newState;

    case actionTypes.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channelList[0];
      return newState;

    case actionTypes.CHANNEL_FETCH_CREATE:
      newState.isLoading = true;
      return newState;

    case actionTypes.CHANNEL_FETCH_CREATE_SUCCESS:
      newState.isLoading = false;
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      newState.currentChannelMemberList = action.payload.channelMemberList;
      return newState;

    case actionTypes.CHANNEL_FETCH_EDIT:
      newState.isLoading = true;
      return newState;

    case actionTypes.CHANNEL_FETCH_EDIT_SUCCESS:
      newState.isLoading = false;
      newState.channelList = action.payload.channelList;
      newState.currentChannel = action.payload.channel;
      return newState;

    case actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.currentChannelMemberList = action.payload.channelMemberList;
      return newState;

    case actionTypes.ERROR_CHANNEL:
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};
