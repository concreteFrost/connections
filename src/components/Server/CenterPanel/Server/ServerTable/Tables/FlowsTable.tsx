
interface IFlows {
    disabledFlowCount: number;
    enabledFlowCount: number;
    pausedFlowCount: number;
}

interface FlowsProps {
    tableData: IFlows;
    scssClass: any;
}

function FlowsTable(props: FlowsProps) {
    return (<table className={props.scssClass}>
        <thead>
            <tr>
                <th colSpan={2}>Flows</th>
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
    </table>)
}

export default FlowsTable;