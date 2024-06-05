import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";
import apiOperations from "@/utils/apiOperaions";

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
export async function findAdmin({ adminId }) {
    await csrf();

    const response = await axios.get(`${API_ADMIN}/admins/${adminId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

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

export async function deleteAdmin({ adminId }) {
    await csrf();

    const response = await axios.delete(`${API_ADMIN}/admins/${adminId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
