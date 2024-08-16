import { userToken } from "models/user";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ element }) => {
  // 로그인 여부 확인
  const isAuthenticated = !!userToken;

  return isAuthenticated ? <Navigate to="/" /> : element;
};

export default GuestRoute;
