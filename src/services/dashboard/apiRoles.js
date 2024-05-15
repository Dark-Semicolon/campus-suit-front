import axios from "../../lib/axios";
import { API_ADMIN } from "../../utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

// Get All Roles
export async function getRoles({
  page = 1,
  perPage,
  searchValue,
  sortBy,
  filter,
  includeFields,
  filterAndSortAndPageQuery,
} = {}) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/roles`;

  if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

  //Search
  if (searchValue) {
    let searchQuery = `search=${searchValue}`;
    query += `${query.includes("?") ? "&" : "?"}${searchQuery}`;
  }

  //Filter
  if (Array.isArray(filter)) {
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

// Create new Role
export async function createRole({ name, permissions }) {
  await csrf();

  const response = await axios.post(`${API_ADMIN}/roles`, {
    name,
    permissions,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}

// Delete Role
export async function deleteRole(roleId) {
  await csrf();

  const response = await axios.delete(`${API_ADMIN}/roles/${roleId}`);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.response.data.message);
  }
}

// update Role Data
export async function updateRole({ roleId, name, permissions }) {
  await csrf();

  const response = await axios.patch(`${API_ADMIN}/roles/${roleId}`, {
    name,
    permissions,
  });

  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
