import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import messageReducer from "./message.reducer";
import channelReducer from "./channel.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  channelReducer,
  messageReducer,
  userReducer
});

export default rootReducer;
