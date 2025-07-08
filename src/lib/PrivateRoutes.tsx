import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
 const authToken = localStorage.getItem("authToken");

  if (authToken === null) {
    return <Navigate to={"/signin"} />;
  }

  return <Outlet />;
};
export default PrivateRoutes;
