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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    // const alreadyRedirected = sessionStorage.getItem("redirected401");

    if (status === 401) {
      // Prevent repeat redirects
      sessionStorage.clear(); // clear all session data
      // sessionStorage.setItem("redirected401", "true");
      // window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);
