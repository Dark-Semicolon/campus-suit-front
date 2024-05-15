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

// response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     const statusCode = error.response.status;
//     if ([402, 401, 403, 404, 500].includes(statusCode)) {
//       // Handle the Error codes here
//       window.location = `/error/${statusCode}`;
//       console.error("Error Status Code:", statusCode);
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
