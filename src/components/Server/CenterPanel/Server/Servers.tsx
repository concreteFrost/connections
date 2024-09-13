import React, { useState } from "react";
import LogSearch from "./LogSearch/LogSearch";
import ServerTable from "./ServerTable/ServerTable";
import Kpis from "./Kpis/Kpis";

function Servers() {
  const [currentView, setCurrentView] = useState<string>("table");

  return (
    <>
      {currentView === "table" ? (
        <ServerTable setCurrentView={setCurrentView} />
      ) : currentView === "search" ? (
        <LogSearch setCurrentView={setCurrentView} />
      ) : <Kpis setCurrentView={setCurrentView}/> }
    </>
  );
}

export default Servers;
