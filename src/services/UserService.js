import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "https://reqres.in/api/users";

const handleError = (error) => {
  console.error("API error", error);
  throw error;
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/${userId}`);
  } catch (error) {
    handleError(error);
  }
};

export default {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
};
