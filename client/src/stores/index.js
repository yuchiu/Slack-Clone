import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "@/reducers";

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : (window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk, logger))
);

export default store;
