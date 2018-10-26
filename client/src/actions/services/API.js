import io from "socket.io-client";
import axios from "axios";

const apiV1 = () =>
  axios.create({
    baseURL:
      /* assume API server will expose port 3030 in development, 80 in production */
      process.env.NODE_ENV === "production"
        ? "http://localhost:80/api/v1"
        : "http://localhost:3030/api/v1",
    withCredentials: true
  });

const socket = io(
  /* assume API server will expose port 3030 in development, 80 in production */
  process.env.NODE_ENV === "production"
    ? "ws://localhost:80"
    : "ws://localhost:3030"
);

export { socket, apiV1 };
