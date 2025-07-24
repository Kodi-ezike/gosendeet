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
    const accessToken = sessionStorage.getItem("authToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let redirected = false;
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && !redirected) {
      redirected = true; // Prevent repeat redirects
      sessionStorage.clear(); // clear all session data
      sessionStorage.setItem("sessionExpired", "true");
    }

    return Promise.reject(error);
  }
);
