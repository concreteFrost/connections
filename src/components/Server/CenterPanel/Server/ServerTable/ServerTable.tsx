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
import useStore from "store/store";
import {
  killServer,
  startServer,
  stopServer,
} from "utils/server/serverOperations";

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
            onClick={() => startServer(getServerData)}
            onMouseEnter={() => setTooltipText("Start Connections Server")}
          >
            {connectionsIcons.serverButtonsIcons.play}
          </button>
          <button
            className={`${s.stop} tooltip-item`}
            onClick={() => stopServer(getServerData)}
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
            onClick={() => killServer(getServerData)}
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
        <div className={s.col_one}>
          <OperationTable
            tableData={{
              lastShutdownTime: tableData.lastShutdownTime,
              startTime: tableData.startTime,
              status: tableData.status,
            }}
          ></OperationTable>
          <FlowsTable
            tableData={{
              disabledFlowCount: tableData.disabledFlowCount,
              enabledFlowCount: tableData.enabledBlockCount,
              pausedFlowCount: tableData.pausedFlowCount,
            }}
          ></FlowsTable>
        </div>

        <div className={s.col_three}>
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
        </div>

        <div className={s.col_two}>
          <BlocksTable
            tableData={{
              enabledBlockCount: tableData.enabledBlockCount,
              disabledBlockCount: tableData.disabledBlockCount,
            }}
          ></BlocksTable>

          <MonitorsTable
            tableData={{
              enabledDirectoryMonitorCount:
                tableData.enabledDirectoryMonitorCount,
              disabledDirectoryMonitorCount:
                tableData.disabledDirectoryMonitorCount,
            }}
          ></MonitorsTable>
          <SchedulesTable
            tableData={{
              enabledScheduleCount: tableData.enabledScheduleCount,
              disabledScheduleCount: tableData.disabledScheduleCount,
            }}
          ></SchedulesTable>
        </div>

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
