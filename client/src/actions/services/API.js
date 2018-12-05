import io from "socket.io-client";
import axios from "axios";

const apiV1 = () =>
  axios.create({
    baseURL:
      /* assume API server will expose port 3030 in development, 80 in production */
      process.env.NODE_ENV === "production"
        ? "http://18.224.68.146:80/api/v1"
        : "http://18.224.68.146:80/api/v1",
    withCredentials: true
  });

const socket = io(
  /* assume API server will expose port 3030 in development, 80 in production */
  process.env.NODE_ENV === "production"
    ? "ws://18.224.68.146:80"
    : "ws://18.224.68.146:80"
);

export { socket, apiV1 };
