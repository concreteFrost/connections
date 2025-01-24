import s from "./ServerTable.module.scss";
import { connectionsIcons } from "assets/icons/icons";
import { getServerStatusAPI } from "api/data";
import { useEffect, useState } from "react";
import OperationTable from "./Tables/OperationTable";
import FlowsTable from "./Tables/FlowsTable";
import BlocksTable from "./Tables/BlocksTable";
import MonitorsTable from "./Tables/MonitorsTable";
import SchedulesTable from "./Tables/ISchedulesTable";
import MetricsTable from "./Tables/MetricsTable";
import { killServerAPI, startServerAPI, stopServerAPI } from "api/server";
import useStore from "store/store";

interface ITableData {
  alertsRaised: number;
  completedProcessesCount: number;
  currentProcessesCount: number;
  disabledBlockCount: number;
  disabledDirectoryMonitorCount: number;
  disabledFlowCount: number;
  disabledScheduleCount: number;
  enabledBlockCount: number;
  enabledDirectoryMonitorCount: number;
  enabledFlowCount: number;
  enabledScheduleCount: number;
  errorCount: number;
  fataErrorCount: number;
  inputFilesProcessedCount: number;
  lastShutdownTime: string;
  pausedFlowCount: number;
  schedulesInitiatedCount: number;
  startTime: string;
  status: number;
  warningCount: number;
}

const data: ITableData = {
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

function ServerTable() {
  const [tableData, setTableData] = useState<ITableData>(data);
  const [serverStatus, setServerStatus] = useState<string>("");
  const { setTooltipText } = useStore(
    (store) => store.designerVisualElementsSlice
  );

  function startServer() {
    startServerAPI()
      .then((res) => {
        getServerData();
        console.log("start server success", res);
      })
      .catch((e) => {
        console.log("start server error", e);
      });
  }

  function stopServer() {
    stopServerAPI()
      .then((res) => {
        getServerData();
        console.log("stop server success", res);
      })
      .catch((e) => {
        console.log("stop server error", e);
      });
  }

  function killServer() {
    killServerAPI()
      .then((res) => {
        getServerData();
        console.log("kill server success", res);
      })
      .catch((e) => {
        console.log("kill server error", e);
      });
  }

  function getServerStatus(res: ITableData) {
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
      .then((res: ITableData) => {
        setTableData(res);
        setServerStatus(getServerStatus(res));
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  useEffect(() => {
    //getting server data on component mounted
    getServerData();
    //assigning interval to get data up to date
    const getStatusOnInterval = setInterval(getServerData, 5000);
    // prevents from calling getStatusOnInterval when component unmounts
    return () => {
      clearInterval(getStatusOnInterval);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.log_search_btn_wrapper}></div>
        <div className={s.header_buttons}>
          <button
            className={`${s.play} tooltip-item`}
            onClick={startServer}
            onMouseEnter={() => setTooltipText("Start Connections Server")}
          >
            {connectionsIcons.serverButtonsIcons.play}
          </button>
          <button
            className={`${s.stop} tooltip-item`}
            onClick={stopServer}
            onMouseEnter={() =>
              setTooltipText(
                "Perform a graceful shutdown of the Connections Server"
              )
            }
          >
            {connectionsIcons.serverButtonsIcons.stop}
          </button>
          <button
            className={`${s.kill} tooltip-item`}
            onClick={killServer}
            onMouseEnter={() =>
              setTooltipText(
                "Hard shutdown of the Connections Server (all current workflows will be terminated)"
              )
            }
          >
            {connectionsIcons.serverButtonsIcons.kill}
          </button>
        </div>
        <div className={s.server_status}>server status : {serverStatus}</div>
      </div>

      <div className={s.main_container}>
        <OperationTable
          tableData={{
            lastShutdownTime: tableData.lastShutdownTime,
            startTime: tableData.startTime,
            status: tableData.status,
          }}
          scssClass={s.main_table}
        ></OperationTable>
        <FlowsTable
          tableData={{
            disabledFlowCount: tableData.disabledFlowCount,
            enabledFlowCount: tableData.enabledBlockCount,
            pausedFlowCount: tableData.pausedFlowCount,
          }}
          scssClass={s.main_table}
        ></FlowsTable>
        <BlocksTable
          tableData={{
            enabledBlockCount: tableData.enabledBlockCount,
            disabledBlockCount: tableData.disabledBlockCount,
          }}
          scssClass={s.main_table}
        ></BlocksTable>
        <MonitorsTable
          tableData={{
            enabledDirectoryMonitorCount:
              tableData.enabledDirectoryMonitorCount,
            disabledDirectoryMonitorCount:
              tableData.disabledDirectoryMonitorCount,
          }}
          scssClass={s.main_table}
        ></MonitorsTable>
        <SchedulesTable
          tableData={{
            enabledScheduleCount: tableData.enabledScheduleCount,
            disabledScheduleCount: tableData.disabledScheduleCount,
          }}
          scssClass={s.main_table}
        ></SchedulesTable>
        <MetricsTable
          tableData={{
            alertsRaised: tableData.alertsRaised,
            completedProcessesCount: tableData.completedProcessesCount,
            currentProcessesCount: tableData.currentProcessesCount,
            errorCount: tableData.errorCount,
            fataErrorCount: tableData.fataErrorCount,
            inputFilesProcessedCount: tableData.inputFilesProcessedCount,
            schedulesInitiatedCount: tableData.schedulesInitiatedCount,
            warningCount: tableData.warningCount,
          }}
          scssClass={s.main_table}
        ></MetricsTable>
        {/* <table className={s.main_table}>
          <thead>
            <tr>
              <th colSpan={2}>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reset Statistics On Shutdown</td>
              <td>value</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default ServerTable;
