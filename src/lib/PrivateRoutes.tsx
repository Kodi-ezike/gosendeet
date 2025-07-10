import { useEffect } from "react";
import {  Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem("authToken");

  const role = sessionStorage.getItem("role");

  // Redirect non-user roles (e.g., admins) back to previous page
  useEffect(() => {
    // Redirect unauthenticated users
    if (!authToken) {
      navigate("signin");
    }
    if (authToken && role !== "user") {
      navigate(-1); // Go back to the previous page
    }
  }, [authToken, role, navigate]);

  // Authenticated 'user' role can access
  if (authToken && role === "user") {
    return <Outlet />;
  }

  // Render nothing while navigating away
  return null;
};
export default PrivateRoutes;
