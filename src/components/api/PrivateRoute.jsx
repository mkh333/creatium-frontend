import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem("token");
  return isAuth ? children : <Navigate to="/sign-in" replace />;
};
