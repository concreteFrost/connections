import { Route, Routes } from "react-router-dom";
import s from "./style/ServerCenterPanel.module.scss";
import Flow from "../components/Server/CenterPanel/Flow/Flow";
import Security from "../components/Server/CenterPanel/Security/Security";
import ProtectedRoute from "../utils/ProtectedRoute";
import Servers from "../components/Server/CenterPanel/ServerDashboard/ServerDashboard";
import Settings from "../components/Server/CenterPanel/Settings/Settings";
import Alerts from "../components/Server/CenterPanel/Alerts/Alerts";
import Kpis from "components/Server/CenterPanel/Kpis/Kpis";
import LogSearch from "components/Server/CenterPanel/LogSearch/LogSearch";

function ServerCenterPanel() {
  return (
    <div className={s.wrapper}>
      <Routes>
        <Route
          path="/servers"
          element={
            <ProtectedRoute>
              <Servers></Servers>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/flows/:id"
          element={
            <ProtectedRoute>
              <Flow></Flow>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/security"
          element={
            <ProtectedRoute>
              <Security></Security>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings></Settings>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/alerts/*"
          element={
            <ProtectedRoute>
              <Alerts></Alerts>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/metrics/*"
          element={
            <ProtectedRoute>
              <Kpis></Kpis>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/log-search/*"
          element={
            <ProtectedRoute>
              <LogSearch></LogSearch>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default ServerCenterPanel;
