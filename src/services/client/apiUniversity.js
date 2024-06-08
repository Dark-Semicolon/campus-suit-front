import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//getUserUniversities
export async function getUserUniversities({
    filter,
    fields,
    sortBy,
    page = 1,
    perPage = 10,
    paginationLink,
}) {
    await csrf();

    // Base API Query
    let queryLink = `${API_WEB}/universities`;
    // apiOperations
    const query = apiOperations({
        queryLink,
        filter,
        fields,
        sortBy,
        page,
        perPage,
        paginationLink,
    });
    //Feaching The Data before adding all operations
    const response = await axios.get(query);

    if (response.status !== 200) {
        throw new Error(response.response.data.message);
    }

    return response.data;
}

export async function createUniversity({ logo, name, description }) {
    await csrf();

    const response = await axios.post(`${API_WEB}/universities`, { logo, name, description });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function updateUniversity({ logo, name, description, universityId }) {
    await csrf();

    const response = await axios.patch(`${API_WEB}/universities/${universityId}`, {
        logo,
        name,
        description,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function deleteUniversity({ universityId }) {
    await csrf();

    const response = await axios.delete(`${API_WEB}/universities/${universityId}`);

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
