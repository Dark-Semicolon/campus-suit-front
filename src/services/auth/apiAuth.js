import axios from "@/lib/axios";
import { API_ADMIN, API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperaions";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//login
export async function login({ gardName = "client", email, password, remember = false }) {
    await csrf();

    const response = await axios.post(`${gardName !== "client" ? gardName : ""}/login`, {
        email,
        password,
        remember,
    });

    if (response.status !== 204) {
        throw new Error(response.response.data.message);
    }
}

//logout
export async function logout({ gardName = "client" }) {
    await csrf();

    const response = await axios.post(`${gardName !== "client" ? gardName : ""}/logout`);

    if (response.status !== 204) throw new Error(response.response.data.message);
}

//forgetPassword
export async function forgetPassword({ gardName = "client", email }) {
    await csrf();

    const response = await axios.post(`${gardName !== "client" ? gardName : ""}/forgot-password`, {
        email,
    });

    if (response.status !== 200) throw new Error(response.response.data.message);

    return response;
}

//resetPassword
export async function resetPassword({
    gardName = "client",
    token,
    email,
    password,
    password_confirmation,
}) {
    await csrf();

    const response = await axios.post(`${gardName !== "client" ? gardName : ""}/reset-password`, {
        token,
        email,
        password,
        password_confirmation,
    });

    if (response.status !== 200) throw new Error(response.response.data.message);
}

//getCurrentUser
export async function getCurrentUser({ fields, include, gardName = "client" }) {
    await csrf();

    let link = "";

    switch (gardName) {
        case "admin":
            link = `${API_ADMIN}`;
            break;
        case "client":
            link = `${API_WEB}`;
            break;
        default:
            break;
    }

    const queryLink = apiOperations({ queryLink: `${link}/user`, fields, include });

    const response = await axios.get(queryLink);

    if (response.status === 200) return response.data;

    if (response.status === 401) throw new Error(response.response.data.message);
}
