import axios from "axios";

const API = axios.create({
  baseURL: "https://pwexpressdeployment.onrender.com", // Express backend
});

// Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;