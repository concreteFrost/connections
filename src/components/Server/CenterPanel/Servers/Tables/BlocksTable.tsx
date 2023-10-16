interface IBlockTable {
    disabledBlockCount: number;
    enabledBlockCount: number;

}

interface BlockProps {
    tableData: IBlockTable,
    scssClass: any
}

function BlocksTable(props: BlockProps) {
    return (<table className={props.scssClass}>
        <thead>
            <tr>
                <th colSpan={2}>Blocks</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Disabled</td>
                <td>{props.tableData.disabledBlockCount}</td>
            </tr>
            <tr>
                <td>Enabled</td>
                <td>{props.tableData.enabledBlockCount}</td>
            </tr>
        </tbody>
    </table>)
}

export default BlocksTable;