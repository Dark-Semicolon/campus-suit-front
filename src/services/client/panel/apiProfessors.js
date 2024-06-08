import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function getProfessors({
    universityId,
    filter,
    fields,
    searchValue,
    filterAndSortAndPageQuery,
    sortBy,
    page = 1,
    perPage = 10,
}) {
    await csrf();

    // Base API Query
    let queryLink = `${API_WEB}/universities/${universityId}/professors`;

    // apiOperations
    const query = apiOperations({
        queryLink,
        page,
        perPage,
        fields,
        filter,
        sortBy,
        searchValue,
        filterAndSortAndPageQuery,
    });

    //Feaching The Data before adding all operations
    const response = await axios.get(query);

    if (response.status !== 200) {
        throw new Error(response.response.data.message);
    }

    return response?.data;
}

export async function createProfessor({
    universityId,
    image,
    name,
    email,
    password,
    password_confirmation,
    status,
}) {
    await csrf();

    const response = await axios.post(`${API_WEB}/universities/${universityId}/professors`, {
        image,
        name,
        email,
        password,
        password_confirmation,
        status,
    });

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function updateProfessor({
    universityId,
    professorId,
    image,
    name,
    email,
    password,
    password_confirmation,
    status,
}) {
    await csrf();

    const response = await axios.patch(
        `${API_WEB}/universities/${universityId}/professors/${professorId}`,
        {
            image,
            name,
            email,
            password,
            password_confirmation,
            status,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function deleteProfessor({ universityId, professorId }) {
    await csrf();

    const response = await axios.delete(
        `${API_WEB}/universities/${universityId}/professors/${professorId}`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
