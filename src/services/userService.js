import axios from "axios";

export const createUser = (data, token) =>
  axios.post("http://localhost:8000/users/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
