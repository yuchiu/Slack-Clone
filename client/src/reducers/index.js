import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import errorReducer from "./error.reducer";
import teamReducer from "./team.reducer";
import messageReducer from "./message.reducer";
import channelReducer from "./channel.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  channelReducer,
  messageReducer,
  errorReducer,
  userReducer
});

export default rootReducer;
