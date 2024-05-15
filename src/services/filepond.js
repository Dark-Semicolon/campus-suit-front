import axios from "../lib/axios";

// CSRF Token API Function
const csrf = () => axios.get("/sanctum/csrf-cookie");

//Upload File
export async function upload(fileData) {
  await csrf();

  const response = await axios.post("/api/filepond", fileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
}

//Restore File
export async function restore(fileToken) {
  await csrf();

  const response = await axios.get(`/api/filepond?restore=${fileToken}`);

  if (response.status !== 204) {
    throw new Error(response.response.data.message);
  }
  return response;
}

//Delete File
export async function deleteFile(token) {
  await csrf();

  const response = await axios.delete(`/api/filepond`, { data: token });

  if (response.status !== 204) throw new Error(response.response.data.message);
}
