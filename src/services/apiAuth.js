import axios from "../lib/axios";
import { API_WEB } from "../utils/constants";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//signup
export async function signup({
  name,
  email,
  password,
  password_confirmation,
  studentData: { gender, phone, parent_phone, grade, city, school },
}) {
  await csrf();

  const response = await axios.post("/register", {
    name,
    email,
    password,
    password_confirmation,
    studentData: { gender, phone, parent_phone, grade, city, school },
  });

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
}

//login
export async function login({ email, password, remember = false }) {
  await csrf();

  const response = await axios.post("/login", { email, password, remember });

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
}

//logout
export async function logout() {
  await csrf();

  const response = await axios.post("/logout");

  if (response.status !== 204) throw new Error(response.response.data.message);
}

//forgetPassword
export async function forgetPassword({ email }) {
  await csrf();

  const response = await axios.post("/forgot-password", { email });

  if (response.status !== 200) throw new Error(response.response.data.message);

  return response;
}

//resetPassword
export async function resetPassword({
  token,
  email,
  password,
  password_confirmation,
}) {
  await csrf();

  const response = await axios.post("/reset-password", {
    token,
    email,
    password,
    password_confirmation,
  });

  if (response.status !== 200) throw new Error(response.response.data.message);
}

//getCurrentUser
export async function getCurrentUser(parameters) {
  await csrf();

  const response = await axios.get(`${API_WEB}/user?${parameters}`);

  if (response.status === 200) return response.data;

  if (response.status === 401) throw new Error(response.response.data.message);
}

//getUserLectures
export async function getUserLectures({
  filter,
  sortBy,
  include,
  includeFields,
  page = 1,
  perPage = 10,
  paginationLink,
}) {
  await csrf();

  // Base API Query
  let query = `${API_WEB}/user/lectures`;

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
      const direction = el.direction === "asc" ? "" : "-";
      sortQuery += `${index !== 0 ? "," : ""}${direction}${el.field}`;
    });

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  } else if (sortBy) {
    let sortQuery = `${sortBy.direction === "asc" ? "" : "-"}${sortBy.field}`;

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  }

  // Include
  if (Array.isArray(include)) {
    let includeQuery = "";

    include.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "&" : ""}include${el.field}=${el.value}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (include) {
    let includeQuery = `include${include.field}=${include.value}`;

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

  if (paginationLink) {
    query = paginationLink;
    query = query.split("http://localhost:8000")[1];
  }

  //Feaching The Data before adding all operations
  const response = await axios.get(query);

  if (response.status !== 200) {
    throw new Error(response.response.data.message);
  }

  return response.data;
}
//getQuizResults
export async function getUserQuizResults({
  sortBy,
  include,
  includeFields,
  page = 1,
  perPage = 10,
  paginationLink,
}) {
  await csrf();

  // Base API Query
  let query = `${API_WEB}/user/quizzesResults`;

  // Sorting
  if (Array.isArray(sortBy)) {
    let sortQuery = "";

    sortBy.forEach((el, index) => {
      const direction = el.direction === "asc" ? "" : "-";
      sortQuery += `${index !== 0 ? "," : ""}${direction}${el.field}`;
    });

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  } else if (sortBy) {
    let sortQuery = `${sortBy.direction === "asc" ? "" : "-"}${sortBy.field}`;

    query += `${query.includes("?") ? "&" : "?"}sort=${sortQuery}`;
  }

  // Include
  if (Array.isArray(include)) {
    let includeQuery = "";

    include.forEach((el, index) => {
      includeQuery += `${index !== 0 ? "&" : ""}include${el.field}=${el.value}`;
    });

    query += `${query.includes("?") ? "&" : "?"}${includeQuery}`;
  } else if (include) {
    let includeQuery = `include${include.field}=${include.value}`;

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

  if (paginationLink) {
    query = paginationLink;
    query = query.split("http://localhost:8000")[1];
  }

  //Feaching The Data before adding all operations
  const response = await axios.get(query);

  if (response.status !== 200) {
    throw new Error(response.response.data.message);
  }

  return response.data;
}

//updat user data
export async function updateUserData({
  name,
  email,
  password,
  passwordConfirmation,
  studentData,
  image,
}) {
  await csrf();

  const userData = {
    name,
    email,
    password,
    passwordConfirmation,
    image,
  };

  // Check if studentData is defined and not empty
  if (studentData && Object.keys(studentData).length > 0) {
    userData.studentData = studentData;
  }
  const filteredUserData = Object.fromEntries(
    Object.entries(userData).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
  const response = await axios.patch(`${API_WEB}/user`, filteredUserData);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.response.data.message);
  }
}
