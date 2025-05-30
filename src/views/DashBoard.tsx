import { Outlet, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Server from "./Server";
import Designer from "./Designer";
import NotFound from "./NotFound";
import PushTest from "../components/PushTest/PushTest";
import Notifications from "../views/Noticifations";
import FlowServerStatus from "../components/FlowServerStatus/FlowServerStatus";
import CurrentAlertsModal from "components/Modals/CurrentAlertsModal";
import useMetricsUpdate from "hooks/useMetricsUpdate";
import useOnDashboardEnter from "hooks/useOnDshboardEnter";

const DashboardLayout = React.memo(() => {
  return (
    <>
      <PushTest />
      <FlowServerStatus />
      <Outlet /> {/* This will render the nested routes */}
      <CurrentAlertsModal></CurrentAlertsModal>
    </>
  );
});

function Dashboard() {
  useOnDashboardEnter();
  useMetricsUpdate();

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="server/*" element={<Server />} />
        <Route path="designer" element={<Designer />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { Dashboard };
