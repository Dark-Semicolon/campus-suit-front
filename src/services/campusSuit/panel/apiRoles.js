import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";
import apiOperations from "@/utils/apiOperaions";

const csrf = () => axios.get("/sanctum/csrf-cookie");

// Get All Faculty Roles Roles
export async function getRoles({
    page = 1,
    perPage,
    searchValue,
    filterAndSortAndPageQuery,
    include,
} = {}) {
    await csrf();

    // Base API Query
    let query = apiOperations({
        queryLink: `${API_ADMIN}/roles`,
        page,
        perPage,
        searchValue,
        include,
        filterAndSortAndPageQuery,
    });

    const response = await axios.get(query);

    if (response.status !== 200) {
        throw new Error(response.response.data.message);
    }
    return response.data;
}

// Create new Faculty Role
export async function createRole({ name, permissions }) {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/roles`, {
        name,
        permissions,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Delete Role
export async function deleteRole({ roleId }) {
    await csrf();

    const response = await axios.delete(`${API_ADMIN}/roles/${roleId}`);

    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(response.response.data.message);
    }
}

// update Faculty Role Data
export async function updateRole({ roleId, name, permissions }) {
    await csrf();

    const response = await axios.patch(`${API_ADMIN}/roles/${roleId}`, {
        name,
        permissions,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
