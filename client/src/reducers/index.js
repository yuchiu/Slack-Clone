import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import directMessageGroupReducer from "./directMessageGroup.reducer";
import channelMessageReducer from "./channelMessage.reducer";
import channelReducer from "./channel.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  directMessageGroupReducer,
  channelMessageReducer,
  channelReducer,
  userReducer
});

export default rootReducer;
