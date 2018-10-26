import io from "socket.io-client";
import axios from "axios";

const apiV1 = () =>
  axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://localhost:80/api/v1"
        : "http://localhost:3030/api/v1",
    withCredentials: true
  });

const socket = io(
  process.env.NODE_ENV === "production"
    ? "ws://localhost:80"
    : "ws://localhost:3030"
);

export { socket, apiV1 };
