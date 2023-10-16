interface IMonitorsTable {
    disabledDirectoryMonitorCount: number;
    enabledDirectoryMonitorCount: number;

}

interface MonitorsTableProps {
    tableData: IMonitorsTable;
    scssClass: any
}

function MonitorsTable(props: MonitorsTableProps) {
    return (<table className={props.scssClass}>
        <thead>
            <tr>
                <th colSpan={2}>Monitors</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Directories Disabled</td>
                <td>{props.tableData.disabledDirectoryMonitorCount}</td>
            </tr>
            <tr>
                <td>Directories Enabled</td>
                <td>{props.tableData.enabledDirectoryMonitorCount}</td>
            </tr>

        </tbody>
    </table>)
}

export default MonitorsTable;