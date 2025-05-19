import moment from "moment";
import { connectionsIcons } from "assets/icons/icons";
import s from "../ServerTable.module.scss";

interface IOperation {
  lastShutdownTime: string;
  startTime: string;
  status: number;
}

interface OperationProps {
  tableData: IOperation;
}

function OperationTable(props: OperationProps) {
  const statusIcon = {
    2: "🟢",
    0: "🔴",
    1: "🟡",
  }[props.tableData.status];

  return (
    <table className={s.main_table}>
      <thead>
        <tr>
          <th colSpan={2}>
            <span>{connectionsIcons.serverTableIcons.operations}</span>
            Operation
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span> {connectionsIcons.serverTableIcons.lastShutdown} </span>Last
            Shutdown
          </td>
          <td>
            {moment(props.tableData.lastShutdownTime).format(
              "MM/DD/YYYY h:mm A"
            )}
          </td>
        </tr>
        <tr>
          <td>
            <span>{connectionsIcons.serverTableIcons.startTime}</span> Start
            Time
          </td>
          <td>
            {moment(props.tableData.startTime).format("MM/DD/YYYY h:mm A")}
          </td>
        </tr>
        <tr>
          <td>
            <span>{connectionsIcons.serverTableIcons.status} </span> Status
          </td>
          <td>{statusIcon}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default OperationTable;
