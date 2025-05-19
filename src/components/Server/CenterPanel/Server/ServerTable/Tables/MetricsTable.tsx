import { connectionsIcons } from "assets/icons/icons";

interface IMetricsTable {
  alertsRaised: number;
  completedProcessesCount: number;
  currentProcessesCount: number;
  errorCount: number;
  fataErrorCount: number;
  inputFilesProcessedCount: number;
  schedulesInitiatedCount: number;
  warningCount: number;
}

interface MetricTableProps {
  tableData: IMetricsTable;
  scssClass: any;
}

function MetricsTable(props: MetricTableProps) {
  return (
    <table className={props.scssClass}>
      <thead>
        <tr>
          <th colSpan={2}>
            <span>{connectionsIcons.serverTableIcons.metricsTable} </span>
            Metrics
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alerts</td>
          <td>{props.tableData.alertsRaised}</td>
        </tr>
        <tr>
          <td>Compiled Processes</td>
          <td>{props.tableData.completedProcessesCount}</td>
        </tr>
        <tr>
          <td>Current Processes</td>
          <td>{props.tableData.currentProcessesCount}</td>
        </tr>
        <tr>
          <td>Errors</td>
          <td>{props.tableData.errorCount}</td>
        </tr>
        <tr>
          <td>Fatal Errors</td>
          <td>{props.tableData.fataErrorCount}</td>
        </tr>
        <tr>
          <td>Input Files</td>
          <td>{props.tableData.inputFilesProcessedCount}</td>
        </tr>
        <tr>
          <td>Schedules</td>
          <td>{props.tableData.schedulesInitiatedCount}</td>
        </tr>
        <tr>
          <td>Warnings</td>
          <td>{props.tableData.warningCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default MetricsTable;
