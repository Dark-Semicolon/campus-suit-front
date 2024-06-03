import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//login
export async function login({ email, password, remember = false }) {
    await csrf();

    const response = await axios.post(`admin/login`, {
        email,
        password,
        remember,
        device_name: "opp",
    });

    if (response.status !== 204) {
        throw new Error(response.response.data.message);
    }
}

//logout
export async function logout() {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/logout`);

    if (response.status !== 204) throw new Error(response.response.data.message);
}

//forgetPassword
export async function forgetPassword({ email }) {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/forgot-password`, { email });

    if (response.status !== 200) throw new Error(response.response.data.message);

    return response;
}

//resetPassword
export async function resetPassword({ token, email, password, password_confirmation }) {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/reset-password`, {
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

    const response = await axios.get(`${API_ADMIN}/user`);

    if (response.status === 200) return response.data;

    if (response.status === 401) throw new Error(response.response.data.message);
}
