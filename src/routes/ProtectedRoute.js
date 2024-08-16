import { userToken } from "models/user";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!userToken;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
