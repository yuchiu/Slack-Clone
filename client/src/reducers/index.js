import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";
import directMessageReducer from "./directMessage.reducer";
import channelReducer from "./channel.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  directMessageReducer,
  channelReducer,
  userReducer
});

export default rootReducer;
