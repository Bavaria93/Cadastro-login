import axios from "axios";

export const fetchProfiles = params =>
  axios.get("http://localhost:8000/profiles/", { params });
