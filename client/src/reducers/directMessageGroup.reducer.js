import constants from "@/constants";

const initialState = {
  directMessageGroupList: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.error = "";
      newState.directMessageGroupList = action.payload.directMessageGroupList;
      return newState;

    default:
      return state;
  }
};
