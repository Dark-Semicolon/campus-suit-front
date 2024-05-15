import axios from "../../lib/axios";

import { API_ADMIN } from "../../utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function getStats() {
  await csrf();

  const response = await axios.get(`${API_ADMIN}/dashboard`);

  if (response.status !== 200) {
    throw new Error(response.response.data.message);
  }
  return response.data;
}
