import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

const csrf = () => axios.get("/sanctum/csrf-cookie");

//Get All Admins
export async function getAllAdmins({
    filter,
    fields,
    load,
    include,
    searchValue,
    filterAndSortAndPageQuery,
    sortBy,
    page = 1,
    perPage = 10,
}) {
    await csrf();

    // Base API Query
    let queryLink = `${API_ADMIN}/admins`;

    // apiOperations
    const query = apiOperations({
        queryLink,
        page,
        perPage,
        fields,
        filter,
        load,
        include,
        sortBy,
        searchValue,
        filterAndSortAndPageQuery,
    });

    const response = await axios.get(query);

    if (response.status !== 200) {
        throw new Error(response.response.data.message);
    }

    return response?.data;
}

//Find Admin
export async function findAdmin({ adminId, include }) {
    await csrf();

    const queryLink = apiOperations({ queryLink: `${API_ADMIN}/admins/${adminId}`, include });
    const response = await axios.get(queryLink);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Create New Admin
export async function createAdmin({ image, name, email, password, passwordConfirmation, status }) {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/admins`, {
        image,
        name,
        email,
        password,
        passwordConfirmation,
        status,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Update Admin Data
export async function UpdateAdmin({
    adminId,
    image,
    name,
    email,
    password,
    passwordConfirmation,
    status,
}) {
    await csrf();

    const response = await axios.patch(`${API_ADMIN}/admins/${adminId}`, {
        adminId,
        image,
        name,
        email,
        password,
        passwordConfirmation,
        status,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Delete Admin
export async function deleteAdmin({ adminId }) {
    await csrf();

    const response = await axios.delete(`${API_ADMIN}/admins/${adminId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// assign roles for the admin
export async function assignRoles({ adminId, roles }) {
    await csrf();

    const response = await axios.put(`${API_ADMIN}/admins/${adminId}/roles`, {
        roles,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// assign permissions for the admin
export async function assignPermissions({ adminId, permissions }) {
    await csrf();

    const response = await axios.put(`${API_ADMIN}/admins/${adminId}/permissions`, {
        permissions,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
