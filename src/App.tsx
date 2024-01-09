
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
import { useState,useEffect } from "react";

function App() {

  const tooltipText = useStore((store) => store.designerVisualElementsSlice.tooltip.text);
  const [webSocket, setWebSocket] = useState(null);
  const [webSocketData, setWebSocketData] = useState(null);

  useEffect(() => {
    // Open a WebSocket connection
    const ws :any = new WebSocket('wss://livepersoninc.github.io/ws-test-page/');

    // Event listener for when the connection is opened
    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    // Event listener for when a message is received
    ws.addEventListener('message', (event :any) => {
      const receivedData = JSON.parse(event.data);
      console.log('WebSocket data received:', receivedData);
      setWebSocketData(receivedData);
    });

    // Event listener for when an error occurs
    ws.addEventListener('error', (error : any) => {
      console.error('WebSocket error:', error);
    });

    // Event listener for when the connection is closed
    ws.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    // Set the WebSocket instance in the state
    setWebSocket(ws);

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard/*" element={<ProtectedRoute><Server></Server></ProtectedRoute>} />
        <Route path="/designer" element={<ProtectedRoute><Designer></Designer></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><Alerts></Alerts></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MessageModal></MessageModal>
      <ConfirmationModal></ConfirmationModal>
      <Tooltip anchorSelect=".tooltip-item" place="right" style={{ zIndex: 9999 }}  >
            {tooltipText}
        </Tooltip>

    </Router>
  );
}

export default App;

