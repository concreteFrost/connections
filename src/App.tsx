import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import ConfirmationModal from "./components/Modals/ConfirmationModal";
import MessageModal from "./components/Modals/MessageModal";
import ApproveModal from "./components/Modals/ApproveModal";
import { Tooltip } from "react-tooltip";
import useStore from "./store/store";

import { Dashboard } from "./views/DashBoard";

function App() {
  const tooltipText = useStore((store) => store.designerVisualElementsSlice.tooltip.text);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <>
      <ApproveModal />
      <ConfirmationModal />
      <MessageModal />
      <Tooltip anchorSelect=".tooltip-item" place="right" style={{ zIndex: 9999 }}>
        {tooltipText}
      </Tooltip>
      </>
    
    </Router>
  );
}

export default App;
