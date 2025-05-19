import { connectionsIcons } from "assets/icons/icons";
import s from "../ServerTable.module.scss";

interface ISchedulesTable {
  disabledScheduleCount: number;
  enabledScheduleCount: number;
}

interface SchedulesTableProps {
  tableData: ISchedulesTable;
}

function SchedulesTable(props: SchedulesTableProps) {
  return (
    <table className={s.main_table}>
      <thead>
        <tr>
          <th colSpan={2}>
            <span>{connectionsIcons.serverTableIcons.startTime}</span>
            Schedules
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={s.disabled}>
          <td>Disabled</td>
          <td>{props.tableData.disabledScheduleCount}</td>
        </tr>
        <tr className={s.enabled}>
          <td>Enabled</td>
          <td>{props.tableData.enabledScheduleCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SchedulesTable;
