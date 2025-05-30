import OperationCard from "./Elements/OperationCard";
import FlowsCard from "./Elements/FlowsCard";
import BlocksCard from "./Elements/BlocksCard";
import MonitorsCard from "./Elements/MonitorsCard";
import SchedulesCard from "./Elements/SchedulesCard";
import MetricsCard from "./Elements/MetricsCard";
import s from "../ServerDashboard.module.scss";
import { useEffect } from "react";

type Props = {
  tableData: any;
  getServerData: () => void;
};

export default function ServerCardsWrapper({
  tableData,
  getServerData,
}: Props) {
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
    <div className={s.main_container}>
      <div className={s.col_one}>
        <OperationCard
          tableData={{
            lastShutdownTime: tableData.lastShutdownTime,
            startTime: tableData.startTime,
            status: tableData.status,
          }}
        ></OperationCard>
        <FlowsCard
          tableData={{
            disabledFlowCount: tableData.disabledFlowCount,
            enabledFlowCount: tableData.enabledBlockCount,
            pausedFlowCount: tableData.pausedFlowCount,
          }}
        ></FlowsCard>
      </div>

      <div className={s.col_three}>
        <MetricsCard
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
        ></MetricsCard>
      </div>

      <div className={s.col_two}>
        <BlocksCard
          tableData={{
            enabledBlockCount: tableData.enabledBlockCount,
            disabledBlockCount: tableData.disabledBlockCount,
          }}
        ></BlocksCard>

        <MonitorsCard
          tableData={{
            enabledDirectoryMonitorCount:
              tableData.enabledDirectoryMonitorCount,
            disabledDirectoryMonitorCount:
              tableData.disabledDirectoryMonitorCount,
          }}
        ></MonitorsCard>
        <SchedulesCard
          tableData={{
            enabledScheduleCount: tableData.enabledScheduleCount,
            disabledScheduleCount: tableData.disabledScheduleCount,
          }}
        ></SchedulesCard>
      </div>
    </div>
  );
}
