import { Navigate } from "react-router-dom";
import { getAccessToken } from "../store/actions/storageActions";
import { useEffect } from "react";
import { clearUserData } from "../store/actions/storageActions";

const ProtectedRoute = ({ children }) => {
  const user = getAccessToken();

  useEffect(() => {
    if (!user.token || (user.expires && new Date() > new Date(user.expires))) {
      clearUserData()
    }
  }, [])

  if (!user.is_logged_in || user.is_logged_in === "false") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
