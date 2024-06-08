import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function getFaculties({
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
    let queryLink = `${API_WEB}/universities/${universityId}/faculties`;

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

    return response;
}

export async function getFacultyStats({ universityId, facultyId }) {
    await csrf();

    const response = await axios.get(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/stats`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function createFaculty({ logo, name, description, universityId }) {
    await csrf();

    const response = await axios.post(`${API_WEB}/universities/${universityId}/faculties`, {
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

export async function updateFaculty({ logo, name, description, universityId, facultyId }) {
    await csrf();

    const response = await axios.patch(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}`,
        {
            logo,
            name,
            description,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function deleteFaculty({ universityId, facultyId }) {
    await csrf();

    const response = await axios.delete(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
