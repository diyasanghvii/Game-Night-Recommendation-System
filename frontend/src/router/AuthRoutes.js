import { Outlet, Navigate } from "react-router-dom";

const AuthRoutes = () => {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
