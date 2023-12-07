
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Designer from "./components/Designer/Designer";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import Server from "./components/Server/Server";
import Alerts from "./components/Notifications/Noticifations";
import MessageModal from "./components/Modals/MessageModal";

function App() {

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
    </Router>
  );
}

export default App;

