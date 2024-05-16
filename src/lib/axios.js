import Axios from "axios";
import { API_URL } from "../utils/constants";

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
