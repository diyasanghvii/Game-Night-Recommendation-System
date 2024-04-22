import { Outlet, Navigate } from "react-router-dom";

const AuthRoutes = () => {
  var storedAuthToken = sessionStorage.getItem("authToken");
  let auth = { token: storedAuthToken ? true : false };
  return auth.token ? <Outlet /> : <Navigate to="/home" />;
};

export default AuthRoutes;
