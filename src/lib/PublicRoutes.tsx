
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {

  const authToken = localStorage.getItem("authToken");

  if (authToken !== null) {
    return <Navigate to={"/dashboard"} />;
  }

  return <Outlet />;
};

export default PublicRoutes;
