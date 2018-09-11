import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import teamReducer from "./team.reducer";

const rootReducer = combineReducers({
  authReducer,
  teamReducer,
  userReducer
});

export default rootReducer;
