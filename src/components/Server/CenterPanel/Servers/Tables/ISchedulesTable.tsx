interface ISchedulesTable {
    disabledScheduleCount: number;
    enabledScheduleCount: number;
}

interface SchedulesTableProps {
    tableData: ISchedulesTable;
    scssClass: any
}

function SchedulesTable(props: SchedulesTableProps) {
    return (<table className={props.scssClass}>
        <thead>
            <tr>
                <th colSpan={2}>Schedules</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Disabled</td>
                <td>{props.tableData.disabledScheduleCount}</td>
            </tr>
            <tr>
                <td>Enabled</td>
                <td>{props.tableData.enabledScheduleCount}</td>
            </tr>
        </tbody>
    </table>)
}

export default SchedulesTable;