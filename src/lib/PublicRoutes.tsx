import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const authToken = sessionStorage.getItem("authToken");
  const role = sessionStorage.getItem("role");

  if (authToken && role === "user") {
    return <Navigate to={"/dashboard"} />;
  }

  if (authToken && role === "super_admin") {
    return <Navigate to={"/admin-dashboard"} />;
  }

  return <Outlet />;
};

export default PublicRoutes;
