import s from "./Servers.module.scss";
import { connectionsIcons } from "../../../../icons/icons";
import { getServerStatusAPI } from "../../../../api/data";
import { useEffect, useState } from "react";
import OperationTable from "./Tables/OperationTable";
import FlowsTable from "./Tables/FlowsTable";
import BlocksTable from "./Tables/BlocksTable";
import MonitorsTable from "./Tables/MonitorsTable";
import SchedulesTable from "./Tables/ISchedulesTable";
import MetricsTable from "./Tables/MetricsTable";

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

function Servers() {

    const [tableData, setTableData] = useState<ITableData>(data)
    useEffect(() => {
        getServerStatusAPI().then((res: any) => {
            setTableData(res)
        }).catch((e: any) => {
            console.log(e)
        });
    }, [])

    return (<div className={s.wrapper}>
        <div className={s.header_buttons}>
            <button className={s.play}>{connectionsIcons.serverButtonsIcons.play}</button>
            <button className={s.stop}>{connectionsIcons.serverButtonsIcons.stop}</button>
            <button className={s.kill}>{connectionsIcons.serverButtonsIcons.kill}</button>
        </div>
        <div className={s.main_container}>
            <OperationTable tableData={{
                lastShutdownTime: tableData.lastShutdownTime,
                startTime: tableData.startTime,
                status: tableData.status,

            }} scssClass={s.main_table}></OperationTable>
            <FlowsTable
                tableData={{
                    disabledFlowCount: tableData.disabledFlowCount,
                    enabledFlowCount: tableData.enabledBlockCount,
                    pausedFlowCount: tableData.pausedFlowCount
                }}
                scssClass={s.main_table}
            ></FlowsTable>
            <BlocksTable
                tableData={{
                    enabledBlockCount: tableData.enabledBlockCount,
                    disabledBlockCount: tableData.disabledBlockCount
                }

                }
                scssClass={s.main_table}
            ></BlocksTable>
            <MonitorsTable
                tableData={{
                    enabledDirectoryMonitorCount: tableData.enabledDirectoryMonitorCount,
                    disabledDirectoryMonitorCount: tableData.disabledDirectoryMonitorCount
                }}
                scssClass={s.main_table}
            ></MonitorsTable>
            <SchedulesTable
                tableData={{
                    enabledScheduleCount: tableData.enabledScheduleCount,
                    disabledScheduleCount: tableData.disabledScheduleCount
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
                    warningCount: tableData.warningCount
                }}
                scssClass={s.main_table}
            ></MetricsTable>
            <table className={s.main_table}>
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
            </table>
        </div>
    </div>)
}

export default Servers;

