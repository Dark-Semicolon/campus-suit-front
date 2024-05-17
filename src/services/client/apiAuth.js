import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//signup
export async function signup({ name, email, password, password_confirmation }) {
  await csrf();

  const response = await axios.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
}

//login
export async function login({ email, password, remember = false }) {
  await csrf();

  const response = await axios.post("/login", { email, password, remember });

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
}

//logout
export async function logout() {
  await csrf();

  const response = await axios.post("/logout");

  if (response.status !== 204) throw new Error(response.response.data.message);
}

//forgetPassword
export async function forgetPassword({ email }) {
  await csrf();

  const response = await axios.post("/forgot-password", { email });

  if (response.status !== 200) throw new Error(response.response.data.message);

  return response;
}

//resetPassword
export async function resetPassword({ token, email, password, password_confirmation }) {
  await csrf();

  const response = await axios.post("/reset-password", {
    token,
    email,
    password,
    password_confirmation,
  });

  if (response.status !== 200) throw new Error(response.response.data.message);
}

//getCurrentUser
export async function getCurrentUser() {
  await csrf();

  const response = await axios.get(`${API_WEB}/user`);

  if (response.status === 200) return response.data;

  if (response.status === 401) throw new Error(response.response.data.message);
}
