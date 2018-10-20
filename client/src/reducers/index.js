import { combineReducers } from "redux";

import errorReducer from "./error.reducer";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import messageReducer from "./message.reducer";
import channelReducer from "./channel.reducer";
import globalStateReducer from "./globalState.reducer";

export default combineReducers({
  authReducer,
  teamReducer,
  channelReducer,
  messageReducer,
  errorReducer,
  globalStateReducer,
  userReducer
});
