import io from "socket.io-client";
import axios from "axios";

const apiV1 = () =>
  axios.create({
    baseURL: process.env.SERVER_API_URL || `http://localhost:3030/api/v1`,
    withCredentials: true
  });

const socket = io(process.env.SERVER_WS_URL || "ws://localhost:3030");

export { socket, apiV1 };
