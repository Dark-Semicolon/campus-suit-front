import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function dashboardStats() {
    await csrf();

    const response = await axios.get(`${API_ADMIN}/dashboard`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
