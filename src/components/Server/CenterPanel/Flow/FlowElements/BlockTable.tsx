import { useEffect } from "react";


interface BlockTableProps {
  className: any;
  blockData: any;
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
          {props.blockData && props.blockData.length > 0 ? props.blockData.map((block: any) => {
            return (<tr key={block.blockId}>
              <td>{block.name}</td>
              <td>{block.type}</td>
              <td><input
                type="checkbox"
                checked={block.isEnabled || false}
                disabled
              /></td>
              <td>{block.errors ?? 0}</td>
              <td>{block.fatalErrors ?? 0}</td>
              <td>{block.warnings ?? 0}</td>
            </tr>)

          }) : <tr><td colSpan={6}>no blocks available to view</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default BlockTable;
