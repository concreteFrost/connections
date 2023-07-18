
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./components/Login/Login";
import AppContent from "./components/AppContent";
import { getAccessToken, clearUserData } from "./store/actions/storageActions";
import { useState, useEffect } from "react";
import NotFound from "./components/NotFound/NotFound";
import useStore from "./store/store";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(getAccessToken().is_logged_in);
  const loadFlow = useStore((state)=> state.loadFlow);

  function verifyUser() {
    const user = getAccessToken();
    if (!user.token || user.token && (!user.expires || new Date() > new Date(user.expires))) {
      clearUserData()
      setIsLoggedIn(false.toString())
    }
  }

  useEffect(() => {
    verifyUser()
    loadFlow()
  }, [])

  function _setIsLoggedIn(_isLoggedIn: boolean) {
    setIsLoggedIn(_isLoggedIn.toString())

  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={_setIsLoggedIn} />}></Route>
        <Route path="/dashboard" element={isLoggedIn === true.toString() ? <AppContent /> : <Login setIsLoggedIn={_setIsLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

