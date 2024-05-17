import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//updat user data
export async function updateUserData({ name, email, password, passwordConfirmation, image }) {
  await csrf();

  const userData = {
    name,
    email,
    password,
    passwordConfirmation,
    image,
  };

  const filteredUserData = Object.fromEntries(
    Object.entries(userData).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  const response = await axios.patch(`${API_WEB}/user`, filteredUserData);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
