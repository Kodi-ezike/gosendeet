import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://gosendeet-backend.onrender.com/api/v1",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const api = axios.create({
  baseURL: "https://gosendeet-backend.onrender.com/api/v1",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor to add authorization header if access token exists
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
