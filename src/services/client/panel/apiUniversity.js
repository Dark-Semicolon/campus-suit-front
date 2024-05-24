import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//Find University Supervisor
export async function getUniversity({ universityId }) {
  await csrf();

  const response = await axios.get(`${API_WEB}/universities/${universityId}`);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
