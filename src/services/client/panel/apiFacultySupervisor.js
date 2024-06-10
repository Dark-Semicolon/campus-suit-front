import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperations";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function getFacultySupervisors({
    universityId,
    facultyId,
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
    let queryLink = `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors`;

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

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

//Find Faculty Supervisor
export async function findFacultySupervisor({
    universityId,
    facultyId,
    facultySupervisorId,
}) {
    await csrf();

    const response = await axios.get(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

export async function createFacultySupervisor({
    universityId,
    facultyId,
    name,
    email,
    password,
    passwordConfirmation,
    status,
    avatar_url,
}) {
    await csrf();

    const response = await axios.post(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors`,
        {
            name,
            email,
            password,
            passwordConfirmation,
            status,
            avatar_url,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

//update FacultySupervisor
export async function updateFacultySupervisor({
    universityId,
    facultyId,
    facultySupervisorId,
    name,
    email,
    password,
    passwordConfirmation,
    status,
    avatar_url,
}) {
    await csrf();

    const response = await axios.patch(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}`,

        {
            name,
            email,
            password,
            passwordConfirmation,
            status,
            avatar_url,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// delete FacultySupervisor
export async function deleteFacultySupervisor({
    universityId,
    facultyId,
    facultySupervisorId,
}) {
    await csrf();

    const response = await axios.delete(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// update Roles
export async function updateFacultySupervisorRole({
    universityId,
    facultyId,
    facultySupervisorId,
    roles,
}) {
    await csrf();

    const response = await axios.put(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}/roles`,
        {
            roles,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// update Permissions
export async function updateFacultySupervisorPermissions({
    universityId,
    facultyId,
    facultySupervisorId,
    permissions,
}) {
    await csrf();

    const response = await axios.put(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}/permissions`,
        {
            permissions,
        }
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// get FacultySupervisorRole
export async function getFacultySupervisorRoles({
    universityId,
    facultyId,
    facultySupervisorId,
}) {
    const response = await axios.get(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}/roles`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}

// get FacultySupervisorPermission
export async function getFacultySupervisorPermissions({
    universityId,
    facultyId,
    facultySupervisorId,
}) {
    const response = await axios.get(
        `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors/${facultySupervisorId}/permissions`
    );

    if (response.status >= 200 && response.status < 300) {
        return response.data;
    } else {
        throw new Error(response.response.data.message);
    }
}
