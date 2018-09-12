import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import directMessageGroupReducer from "./directMessageGroup.reducer";
import messageReducer from "./message.reducer";
import channelReducer from "./channel.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  directMessageGroupReducer,
  channelReducer,
  messageReducer,
  userReducer
});

export default rootReducer;
