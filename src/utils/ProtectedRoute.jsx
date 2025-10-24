import { getAccessToken } from "../store/actions/sharedActions/storageActions";
import { useEffect } from "react";
import { clearUserData } from "../store/actions/sharedActions/storageActions";

const ProtectedRoute = ({ children }) => {
  const user = getAccessToken();

  //Redirects if the session expired
  useEffect(() => {
    if (!user.token || new Date() > new Date(user.expires)) {
      clearUserData();
      window.location.href = "/login"; // Navigate to the login page
    }
  }, []);

  return children;
};

export default ProtectedRoute;
