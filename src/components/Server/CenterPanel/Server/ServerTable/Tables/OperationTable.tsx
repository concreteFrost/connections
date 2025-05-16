import moment from "moment";

interface IOperation {
  lastShutdownTime: string;
  startTime: string;
  status: number;
}

interface OperationProps {
  tableData: IOperation;
  scssClass: any;
}

function OperationTable(props: OperationProps) {
  return (
    <table className={props.scssClass}>
      <thead>
        <tr>
          <th colSpan={2}>Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Last Shutdown</td>
          <td>
            {moment(props.tableData.lastShutdownTime).format(
              "MM/DD/YYYY h:mm A"
            )}
          </td>
        </tr>
        <tr>
          <td>Start Time</td>
          <td>
            {moment(props.tableData.startTime).format("MM/DD/YYYY h:mm A")}
          </td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{props.tableData.status}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default OperationTable;
