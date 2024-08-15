import { getAccessToken } from "../store/actions/storageActions";
import { useEffect } from "react";
import { clearUserData } from "../store/actions/storageActions";
import useStore from "store/store";

const ProtectedRoute = ({ children }) => {
  const user = getAccessToken();
  const {deleteCurrentUser}= useStore((state)=>state.securitySlice)

  //Redirects if the session expired
  useEffect(() => {
    if (!user.token || new Date() > new Date(user.expires)) {
      clearUserData();
      deleteCurrentUser();
      window.location.href = "/login"; // Navigate to the login page
    }
  }, []);

  return children;
};

export default ProtectedRoute;
