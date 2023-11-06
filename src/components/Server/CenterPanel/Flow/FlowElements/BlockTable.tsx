import { IBlockDataExtended } from "../../../../../store/interfaces/IBlock";

interface BlockTableProps {
  className: any;
  blockData: IBlockDataExtended[];
}

function BlockTable(props: BlockTableProps) {

  return (
    <div className={props.className.blocks_table}>
      <table>
        <thead>
          <tr>
            <th>Block Name</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Errors</th>
            <th>Fatal</th>
            <th>Warnings</th>
          </tr>
        </thead>
        <tbody>
          {props.blockData && props.blockData.length > 0 ? props.blockData.map((block: IBlockDataExtended) => {
            return (<tr key={block.blockIdentifier}>
              <td>{block.name}</td>
              <td>{block.typeName}</td>
              <td><input
                type="checkbox"
                checked={block.stats.isEnabled || false}
                disabled
              /></td>
              <td>{block.stats.errors ?? 0}</td>
              <td>{block.stats.fatalErrors ?? 0}</td>
              <td>{block.stats.warnings ?? 0}</td>
            </tr>)

          }) : <tr><td colSpan={6}>no blocks available to view</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default BlockTable;
