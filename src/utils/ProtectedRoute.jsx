import { getAccessToken } from "../store/actions/storageActions";
import { useEffect } from "react";
import { clearUserData } from "../store/actions/storageActions";

const ProtectedRoute = ({ children }) => {
  const user = getAccessToken();

  useEffect(() => {
    if (!user.token || new Date() > new Date(user.expires)) {
      clearUserData();
      window.location.href = "/login"; // Navigate to the login page
    }
  }, []);

  return children;
};

export default ProtectedRoute;
