import s from "./Alerts.module.scss";
import CurrentAlertsTable from "./CurrentAlertsTable/CurrentAlertsTable";
import ProtectedRoute from "../../../../utils/ProtectedRoute";
import { Route, Routes } from "react-router";
import AlertConfigure from "./AlertConfigure/AlertConfigure";

function Alerts() {

  return (
    <div className={s.wrapper}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><CurrentAlertsTable></CurrentAlertsTable></ProtectedRoute>} />
        <Route path="/configure" element={<ProtectedRoute><AlertConfigure></AlertConfigure></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default Alerts;
