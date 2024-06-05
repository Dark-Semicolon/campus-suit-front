import axios from "@/lib/axios";
import apiOperations from "@/utils/apiOperaions";
import { API_ADMIN } from "@/utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

// Get All Permissions
export async function getPermissions({ page = 1, perPage } = {}) {
    await csrf();

    // Base API Query
    let query = apiOperations({
        queryLink: `${API_ADMIN}/permissions`,
        page,
        perPage,
    });

    const response = await axios.get(query);

    if (response.status !== 200) {
        throw new Error(response.response.data.message);
    }
    return response.data;
}
