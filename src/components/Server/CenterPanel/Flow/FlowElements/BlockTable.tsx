interface IBlockData {
  blockIdentifier: string;
  name: string;
  typeName: string;
  isEnabled: boolean;
}

interface IBlockStats {
  blockId: string;
  errors: number;
  fatalErrors: number;
  isEnabled: boolean;
  warnings: number;
}

interface BlockTableProps {
  className: any;
  blockData: Array<IBlockData>;
  statistics: Array<IBlockStats> | null | undefined; // Allow for null or undefined
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
          {props.blockData && props.blockData.length > 0
            ? props.blockData.map((block: IBlockData) => {
                const stat = props.statistics?.find(
                  (s: IBlockStats) => s.blockId === block.blockIdentifier
                );

                return (
                  <tr key={block.blockIdentifier}>
                    <td>{block.name}</td>
                    <td>{block.typeName}</td>
                    <td className={props.className.centered_table_data}>
                      <input
                        type="checkbox"
                        checked={stat?.isEnabled || false}
                        disabled
                      />
                    </td>
                    <td className={props.className.centered_table_data}>
                      {stat?.errors || 0}
                    </td>
                    <td className={props.className.centered_table_data}>
                      {stat?.fatalErrors || 0}
                    </td>
                    <td className={props.className.centered_table_data}>
                      {stat?.warnings || 0}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default BlockTable;
