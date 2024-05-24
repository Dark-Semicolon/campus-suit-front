import axios from "@/lib/axios";
import { API_WEB } from "@/utils/constants";
import apiOperations from "@/utils/apiOperaions";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

export async function getFacultySupervisor({ universityId, facultyId, filter, fields, searchValue, filterAndSortAndPageQuery, sortBy, page = 1, perPage = 10 }) {
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

export async function createFacultySupervisor({ universityId, facultyId, name, email, password, passwordConfirmation, status }) {
  await csrf();

  const response = await axios.post(
    `${API_WEB}/universities/${universityId}/faculties/${facultyId}/faculty-supervisors`,

    {
      name,
      email,
      password,
      passwordConfirmation,
      status,
    }
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
