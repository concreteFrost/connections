import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Designer from "./components/Designer/Designer";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Server from "./components/Server/Server";
import Alerts from "./components/Notifications/Noticifations";
import MessageModal from "./components/Modals/MessageModal";
import { Tooltip } from "react-tooltip";
import useStore from "./store/store";
import ConfirmationModal from "./components/Modals/ConfirmationModal";
import PushTest from "./components/PushTest/PushTest";
import ApproveModal from "./components/Modals/ApproveModal";
import Notifications from "./components/Notifications/Noticifations";
import { useEffect } from "react";
import { getUserSettingsData } from "./store/actions/storageActions";
import { ReactFlowProvider } from "reactflow";

function App() {
  const tooltipText = useStore((store) => store.designerVisualElementsSlice.tooltip.text);
  

  useEffect(()=>{getUserSettingsData()},[])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard/*" element={<ProtectedRoute><Server></Server></ProtectedRoute>} />
        <Route path="/designer" element={<ProtectedRoute>
          <ReactFlowProvider>
          <Designer></Designer>
          </ReactFlowProvider></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><Notifications></Notifications></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PushTest></PushTest>
      <MessageModal></MessageModal>
      <ApproveModal></ApproveModal>
      <ConfirmationModal></ConfirmationModal>
      <Tooltip anchorSelect=".tooltip-item" place="right" style={{ zIndex: 9999 }}>
        {tooltipText}
      </Tooltip>
    </Router>
  );
}

export default App;
