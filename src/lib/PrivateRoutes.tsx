import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("authToken");

  const role = localStorage.getItem("role");

   // Redirect non-user roles (e.g., admins) back to previous page
  useEffect(() => {
    if (authToken && role !== "user") {
      navigate(-1); // Go back to the previous page
    }
  }, [authToken, role, navigate]);

  // Redirect unauthenticated users
  if (!authToken) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated 'user' role can access
  if (authToken && role === "user") {
    return <Outlet />;
  }

  // Render nothing while navigating away
  return null;
};
export default PrivateRoutes;
