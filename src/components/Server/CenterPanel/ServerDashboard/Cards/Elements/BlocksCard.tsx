import s from "../../ServerDashboard.module.scss";
import { connectionsIcons } from "assets/icons/icons";

interface IBlockTable {
  disabledBlockCount: number;
  enabledBlockCount: number;
}

interface BlockProps {
  tableData: IBlockTable;
}

function BlocksCard(props: BlockProps) {
  return (
    <table className={s.main_table}>
      <thead>
        <tr>
          <th colSpan={2}>
            <span>{connectionsIcons.serverTableIcons.blocksTable}</span>
            Blocks
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className={s.disabled}>
          <td>Disabled</td>
          <td>{props.tableData.disabledBlockCount}</td>
        </tr>
        <tr className={s.enabled}>
          <td>Enabled</td>
          <td>{props.tableData.enabledBlockCount}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default BlocksCard;
