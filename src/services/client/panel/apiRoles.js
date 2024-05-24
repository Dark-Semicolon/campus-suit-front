import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperaions";

const csrf = () => axios.get("/sanctum/csrf-cookie");

// Get All Faculty Roles Roles
export async function getRoles({
    page = 1,
    perPage,
    searchValue,
    filterAndSortAndPageQuery,
    include,
    universityId,
    facultyId,
} = {}) {
    await csrf();

    // Base API Query
    let query = apiOperations({
        queryLink: `${API_WEB}/faculty-supervisors/universities/${universityId}/faculties/${facultyId}/roles`,
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
export async function createRole({ universityId, facultyId, name, permissions }) {
    await csrf();

    const response = await axios.post(
        `${API_WEB}/faculty-supervisors/universities/${universityId}/faculties/${facultyId}/roles`,
        {
            name,
            permissions,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// Delete Role
export async function deleteRole({ roleId, universityId, facultyId }) {
    await csrf();

    const response = await axios.delete(
        `${API_WEB}/faculty-supervisors/universities/${universityId}/faculties/${facultyId}/roles/${roleId}`
    );
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(response.response.data.message);
    }
}

// update Faculty Role Data
export async function updateRole({ roleId, universityId, facultyId, name, permissions }) {
    await csrf();

    const response = await axios.patch(
        `${API_WEB}/faculty-supervisors/universities/${universityId}/faculties/${facultyId}/roles/${roleId}`,
        {
            name,
            permissions,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
