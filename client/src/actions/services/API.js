import axios from "axios";
import { localStore } from "@/utils";

export const APIV1 = () =>
  axios.create({
    baseURL: `http://localhost:3030/api/v1`,
    headers: {
      Authorization: `Bearer ${localStore.getToken()}`
    }
  });
