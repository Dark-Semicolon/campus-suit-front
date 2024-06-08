import axios from "@/lib/axios";
import { API_ADMIN } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

const csrf = () => axios.get("/sanctum/csrf-cookie");

//Get All clients
export async function getClients({
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
    let queryLink = `${API_ADMIN}/clients`;

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

//Find clients
export async function findClient({ clientId }) {
    await csrf();

    const response = await axios.get(`${API_ADMIN}/clients/${clientId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Create new Client
export async function createClient({ image, name, email, password, passwordConfirmation, status }) {
    await csrf();

    const response = await axios.post(`${API_ADMIN}/clients`, {
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

// Update Client Data
export async function UpdateClient({
    clientId,
    image,
    name,
    email,
    password,
    passwordConfirmation,
    status,
}) {
    await csrf();

    const response = await axios.patch(`${API_ADMIN}/clients/${clientId}`, {
        clientId,
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

// Delete Client
export async function deleteClient({ clientId }) {
    await csrf();

    const response = await axios.delete(`${API_ADMIN}/clients/${clientId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
