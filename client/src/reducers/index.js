import { combineReducers } from "redux";

import textReducer from "./text.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  textReducer,
  userReducer
});

export default rootReducer;
