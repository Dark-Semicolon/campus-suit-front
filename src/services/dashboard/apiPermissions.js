import axios from "../../lib/axios";
import { API_ADMIN } from "../../utils/constants";

const csrf = () => axios.get("/sanctum/csrf-cookie");

// Get All Permissions
export async function getPermissions({
  page = 1,
  perPage,
  searchValue,
  includeFields,
  filterAndSortAndPageQuery,
} = {}) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/permissions`;

  if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

  //Search
  if (searchValue) {
    let searchQuery = `search=${searchValue}`;
    query += `${query.includes("?") ? "&" : "?"}${searchQuery}`;
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

// Get All permission Categories
export async function getPermissionCategories({
  page = 1,
  perPage,
  searchValue,
  includeFields,
  filterAndSortAndPageQuery,
} = {}) {
  await csrf();

  // Base API Query
  let query = `${API_ADMIN}/permissionCategories`;

  if (filterAndSortAndPageQuery) query += filterAndSortAndPageQuery;

  //Search
  if (searchValue) {
    let searchQuery = `search=${searchValue}`;
    query += `${query.includes("?") ? "&" : "?"}${searchQuery}`;
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
