import actionTypes from "@/actionTypes";

const initialState = {
  messageList: [],
  hasMoreMessage: true,
  isLoading: false
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case actionTypes.CHANNEL_FETCH_ASSOCIATED_LIST_SUCCESS:
      newState.messageList = action.payload.messageList;
      newState.hasMoreMessage = true;
      return newState;

    case actionTypes.MESSAGE_SOCKET_RECEIVE:
      if (
        action.payload.message.channel_id === action.payload.currentChannel.id
      ) {
        newState.messageList = state.messageList.concat(action.payload.message);
      }
      return newState;

    case actionTypes.GLOBAL_SOCKET_CONNECTION_CLEAR:
      newState.messageList = [];
      return newState;

    case actionTypes.MESSAGE_FETCH_MORE:
      newState.isLoading = true;
      return newState;

    case actionTypes.MESSAGE_FETCH_MORE_SUCCESS:
      newState.isLoading = false;
      newState.messageList = action.payload.messageList.concat(
        state.messageList
      );
      if (action.payload.messageList.length < 30) {
        newState.hasMoreMessage = false;
      }
      return newState;

    case actionTypes.ERROR_MESSAGE:
      newState.error = action.payload;
      newState.isLoading = false;
      return newState;

    case actionTypes.USER_FETCH_SIGNOUT:
      return initialState;

    default:
      return state;
  }
};
