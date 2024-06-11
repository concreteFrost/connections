import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./views/Login";
import Designer from "./views/Designer";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Server from "./views/Server";
import MessageModal from "./components/Modals/MessageModal";
import { Tooltip } from "react-tooltip";
import useStore from "./store/store";
import ConfirmationModal from "./components/Modals/ConfirmationModal";
import PushTest from "./components/PushTest/PushTest";
import ApproveModal from "./components/Modals/ApproveModal";
import Notifications from "./views/Noticifations"
import { useEffect, useState } from "react";
import { getAccessToken, getUserSettingsData } from "./store/actions/storageActions";
import FlowServerStatus from "./components/FlowServerStatus/FlowServerStatus";

function App() {
  const tooltipText = useStore((store) => store.designerVisualElementsSlice.tooltip.text);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    
    if(getAccessToken().is_logged_in){
      getUserSettingsData();
      setIsLoggedIn(true);
    }
   }, [])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path="/dashboard/*" element={<ProtectedRoute><Server></Server></ProtectedRoute>} />
        <Route path="/designer" element={<ProtectedRoute>
          <Designer></Designer>
        </ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><Notifications></Notifications></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn? <>  
      <PushTest></PushTest>
      <FlowServerStatus></FlowServerStatus>
      <ApproveModal></ApproveModal>
      <ConfirmationModal></ConfirmationModal>
     </> 
      : null}
    
    <MessageModal></MessageModal>
      <Tooltip anchorSelect=".tooltip-item" place="right" style={{ zIndex: 9999 }}>
        {tooltipText}
      </Tooltip>
    </Router>
  );
}

export default App;
