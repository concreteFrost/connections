import s from "../ServerTable.module.scss";
import { connectionsIcons } from "assets/icons/icons";

interface IFlows {
  disabledFlowCount: number;
  enabledFlowCount: number;
  pausedFlowCount: number;
}

interface FlowsProps {
  tableData: IFlows;
}

function FlowsTable(props: FlowsProps) {
  return (
    <table className={s.main_table}>
      <thead>
        <tr>
          <th colSpan={2}>
            {" "}
            <span>{connectionsIcons.serverMenuIcons.flows}</span>Flows
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Disabled</td>
          <td>{props.tableData.disabledFlowCount}</td>
        </tr>
        <tr>
          <td>Enabled</td>
          <td>{props.tableData.enabledFlowCount}</td>
        </tr>
        <tr>
          <td>Paused</td>
          <td>{props.tableData.pausedFlowCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default FlowsTable;
