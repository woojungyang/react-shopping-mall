import { userToken } from "models/user";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ element }) => {
  const isAuthenticated = !!userToken;

  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default GuestRoute;
