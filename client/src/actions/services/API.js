import axios from "axios";

export const APIV1 = () =>
  axios.create({
    baseURL: `http://localhost:3030/api/v1`,
    withCredentials: true
  });
