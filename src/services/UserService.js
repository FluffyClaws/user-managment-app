import axios from "axios";

const API_URL = "https://reqres.in/api/users";

export const fetchUsers = () => {
  return axios.get(API_URL);
};
