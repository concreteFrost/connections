import { connectionsIcons } from "assets/icons/icons";
import s from "../ServerTable.module.scss";

interface IMonitorsTable {
  disabledDirectoryMonitorCount: number;
  enabledDirectoryMonitorCount: number;
}

interface MonitorsTableProps {
  tableData: IMonitorsTable;
}

function MonitorsTable(props: MonitorsTableProps) {
  return (
    <table className={s.main_table}>
      <thead>
        <tr>
          <th colSpan={2}>
            <span>{connectionsIcons.serverTableIcons.monitorsTable}</span>
            Monitors
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={s.disabled}>
          <td>Directories Disabled</td>
          <td>{props.tableData.disabledDirectoryMonitorCount}</td>
        </tr>
        <tr className={s.enabled}>
          <td>Directories Enabled</td>
          <td>{props.tableData.enabledDirectoryMonitorCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MonitorsTable;
