import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function updateUser({ image, name, email, password, passwordConfirmation }) {
  await csrf();

  const response = await axios.patch(`${API_ADMIN}/user`, {
    image,
    name,
    email,
    password,
    passwordConfirmation,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
