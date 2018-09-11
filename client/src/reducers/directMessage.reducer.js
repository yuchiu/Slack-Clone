import constants from "@/constants";

const initialState = {
  directMessageMemberList: [],
  error: ""
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case constants.GET_TEAM_ASSOCIATED_LIST:
      newState.error = "";
      newState.directMessageMemberList = action.payload.directMessageMemberList;
      return newState;

    default:
      return state;
  }
};
