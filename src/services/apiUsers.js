import axios from "../lib/axios";
import { API_ADMIN } from "../utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

//get Users
export async function getUsers({
  fields,
  filter,
  searchValue,
  sortBy,
  include,
  includeFields,
  page = 1,
  perPage = 10,
  filterAndSortAndPageQuery,
} = {}) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/users`;

  if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

  //Fields
  if (Array.isArray(fields)) {
    let fieldsQuery = "fields=";

    fields.forEach((el, index) => {
      fieldsQuery += `${index !== 0 ? "," : ""}${el}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${fieldsQuery}`;
  } else if (fields) {
    let fieldsQuery = `fields=${fields}`;

    query += `${query.includes("?") ? "&" : "?"}${fieldsQuery}`;
  }

  //Search
  if (searchValue) {
    let searchQuery = `search=${searchValue}`;
    query += `${query.includes("?") ? "&" : "?"}${searchQuery}`;
  }

  if (Array.isArray(filter)) {
    //Filter
    let filterQuery = "";

    filter.forEach((el, index) => {
      filterQuery += `${index !== 0 ? "&" : ""}filter[${el.field}]=${el.value}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  } else if (filter) {
    // Check if filter is a single object
    let filterQuery = `filter[${filter.field}]=${filter.value}`;

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  }

  // Sorting
  if (Array.isArray(sortBy)) {
    let sortQuery = "";

    sortBy.forEach((el, index) => {
      const direction =
        el.direction === "ascending" ? "" : el.direction === "descending" ? "-" : "";
      sortQuery += `${index !== 0 ? "," : ""}${direction}${el.field}`;
    });

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  } else if (sortBy) {
    let sortQuery = `${sortBy.direction === "asc" ? "" : "-"}${sortBy.field}`;

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  }

  // Include as includeAllPermissions=true
  if (Array.isArray(include)) {
    let includeQuery = "";

    include.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "&" : ""}include${el.field}=true`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (include) {
    let includeQuery = `include${include.field}=true`;

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  }

  //includeFields
  if (Array.isArray(includeFields)) {
    let includeQuery = "include=";

    includeFields.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "," : ""}${el}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (includeFields) {
    let includeQuery = `include=${includeFields}`;

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  }

  //Pagination
  if (page !== 0 && page >= 1) {
    query += `${query.includes("?") ? "&" : "?"}page=${page}${
      perPage ? "&perPage=" : ""
    }${perPage}`;
  }

  const response = await axios.get(query);

  if (response.status !== 200) {
    throw new Error(response.response.data.message);
  }
  return response.data;
}

//create User
export async function createUser({
  name,
  email,
  password,
  passwordConfirmation,
  studentData,
  status,
}) {
  await csrf();

  const userData = {
    name,
    email,
    password,
    passwordConfirmation,
    status,
  };

  // Check if studentData is defined and not empty
  if (studentData && Object.keys(studentData).length > 0) {
    userData.studentData = studentData;
  }

  const response = await axios.post(`${API_ADMIN}/users`, userData);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

//delete User
export async function deleteUser(userId) {
  await csrf();

  const response = await axios.delete(`${API_ADMIN}/users/${userId}`);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.response.data.message);
  }
}

// update user
export async function updateUser({
  userId,
  name,
  email,
  password,
  passwordConfirmation,
  studentData,
  status,
}) {
  await csrf();

  const userData = {
    name,
    email,
    password,
    passwordConfirmation,
    status,
  };

  // Check if studentData is defined and not empty
  if (studentData && Object.keys(studentData).length > 0) {
    userData.studentData = studentData;
  }
  const response = await axios.patch(`${API_ADMIN}/users/${userId}`, userData);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

// get user lectures
export async function getUserLectures({
  userId,
  page,
  perPage,
  searchValue,
  include,
  includeFields,
  filter,
  filterAndSortAndPageQuery,
}) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/users/${userId}/lectures`;

  if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

  if (Array.isArray(filter)) {
    //Filter
    let filterQuery = "";

    filter.forEach((el, index) => {
      filterQuery += `${index !== 0 ? "&" : ""}filter[${el.field}]=${el.value}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  } else if (filter) {
    // Check if filter is a single object
    let filterQuery = `filter[${filter.field}]=${filter.value}`;

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  }

  // Include as includeAllPermissions=true
  if (Array.isArray(include)) {
    let includeQuery = "";

    include.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "&" : ""}include${el.field}=true`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (include) {
    let includeQuery = `include${include.field}=true`;

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  }

  //includeFields
  if (Array.isArray(includeFields)) {
    let includeQuery = "include=";

    includeFields.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "," : ""}${el}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (includeFields) {
    let includeQuery = `include=${includeFields}`;

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  }

  //Search
  if (searchValue) {
    let searchQuery = `search=${searchValue}`;
    query += `${query.includes("?") ? "&" : "?"}${searchQuery}`;
  }

  //Pagination
  if (page !== 0 && page >= 1) {
    query += `${query.includes("?") ? "&" : "?"}page=${page}${
      perPage ? "&perPage=" : ""
    }${perPage}`;
  }

  const response = await axios.get(query);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
// get user Watched Videos
export async function getUserWatchedVideos({ userId, filter }) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/users/${userId}/watchedVideos`;

  if (Array.isArray(filter)) {
    //Filter
    let filterQuery = "";

    filter.forEach((el, index) => {
      filterQuery += `${index !== 0 ? "&" : ""}filter[${el.field}]=${el.value}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  } else if (filter) {
    // Check if filter is a single object
    let filterQuery = `filter[${filter.field}]=${filter.value}`;

    query += `${query.includes("?") ? "&" : "?"}${filterQuery}`;
  }

  const response = await axios.get(query);

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

// update user video Views
export async function updateVideoView({ userId, WatchedVideoId, max_view_count }) {
  await csrf();

  const response = await axios.patch(
    `${API_ADMIN}/users/${userId}/watchedVideos/${WatchedVideoId}`,
    {
      max_view_count,
    }
  );

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

// update user permissions
export async function updateUserPermissions({ userId, permissions }) {
  await csrf();

  const response = await axios.put(`${API_ADMIN}/users/${userId}/permissions`, {
    permissions,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

// update user roles
export async function updateUserRoles({ userId, roles }) {
  await csrf();

  const response = await axios.put(`${API_ADMIN}/users/${userId}/roles`, {
    roles,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
