import constants from "@/constants";

const initialState = {
  messageList: [],
  hasMoreMessage: true,
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.messageList = action.payload.messageList;
      newState.hasMoreMessage = true;
      return newState;

    case constants.MESSAGE_SOCKET_RECEIVE:
      if (
        action.payload.message.channel_id === action.payload.currentChannel.id
      ) {
        newState.messageList = state.messageList.concat(action.payload.message);
      }
      return newState;

    case constants.GLOBAL_SOCKET_CONNECTION_CLEAR:
      newState.messageList = [];
      return newState;

    case constants.MESSAGE_FETCH_MORE:
      newState.isLoading = true;
      return newState;

    case constants.MESSAGE_FETCH_MORE_SUCCESS:
      newState.isLoading = false;
      newState.messageList = action.payload.messageList.concat(
        state.messageList
      );
      if (action.payload.messageList.length < 30) {
        newState.hasMoreMessage = false;
      }
      return newState;

    case constants.ERROR_MESSAGE:
      newState.error = action.payload;
      newState.isLoading = false;
      return newState;

    case constants.USER_FETCH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
