import axios from "axios";

const API = axios.create({
  baseURL: "https://pw-express-app-2025.onrender.com", // Express backend
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