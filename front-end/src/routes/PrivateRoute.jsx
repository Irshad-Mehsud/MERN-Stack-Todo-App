import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
