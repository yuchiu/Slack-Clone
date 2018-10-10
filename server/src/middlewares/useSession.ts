import * as session from "express-session";

import sessionConfig from "../config/sessionConfig";

export default () => session(sessionConfig);
