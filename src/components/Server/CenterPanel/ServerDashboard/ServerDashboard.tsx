import s from "./ServerDashboard.module.scss";
import { getServerStatusAPI } from "api/data";
import { useState } from "react";
import ServerCardsWrapper from "./Cards/CardsWrapper";
import ServerControlPanel from "./ServerControlPanel/ServerControlPanel";
import { IServerStatsData } from "store/interfaces/IServer";

const data: IServerStatsData = {
  alertsRaised: 0,
  completedProcessesCount: 0,
  currentProcessesCount: 0,
  disabledBlockCount: 0,
  disabledDirectoryMonitorCount: 0,
  disabledFlowCount: 0,
  disabledScheduleCount: 0,
  enabledBlockCount: 0,
  enabledDirectoryMonitorCount: 0,
  enabledFlowCount: 0,
  enabledScheduleCount: 0,
  errorCount: 0,
  fataErrorCount: 0,
  inputFilesProcessedCount: 0,
  lastShutdownTime: "",
  pausedFlowCount: 0,
  schedulesInitiatedCount: 0,
  startTime: "",
  status: 0,
  warningCount: 0,
};

function ServerDashboard() {
  const [tableData, setTableData] = useState<IServerStatsData>(data);
  const [serverStatus, setServerStatus] = useState<string>("");

  function getServerStatus(res: IServerStatsData) {
    const status = {
      0: "offline",
      1: "starting",
      2: "running",
      3: "restarting",
      4: "shutting down",
    };
    return (
      Object.entries(status).find(
        ([key, val]: [string, string]) => key === res.status.toString()
      )?.[1] ?? "null"
    );
  }

  function getServerData() {
    getServerStatusAPI()
      .then((res: IServerStatsData) => {
        setTableData(res);
        setServerStatus(getServerStatus(res));
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  return (
    <div className={s.wrapper}>
      <ServerControlPanel
        getServerData={getServerData}
        serverStatus={serverStatus}
      ></ServerControlPanel>
      <ServerCardsWrapper
        tableData={tableData}
        getServerData={getServerData}
      ></ServerCardsWrapper>
    </div>
  );
}

export default ServerDashboard;
