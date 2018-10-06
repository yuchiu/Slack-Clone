import io from "socket.io-client";
import axios from "axios";

const apiV1 = () =>
  axios.create({
    baseURL: `http://localhost:3030/api/v1`,
    withCredentials: true
  });

const socket = io("ws://localhost:3030");

export { socket, apiV1 };
