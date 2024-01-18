import s from "./LogTable.module.scss";
function LogTable(){
    return( <div className={s.wrapper}>
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>Timestamp</th>
                    <th colSpan={2}>Log Type</th>
                    <th colSpan={1}>Proc..</th>
                    <th colSpan={2}>Flow</th>
                    <th colSpan={2}>Block</th>
                    <th colSpan={2}>Status</th>
                    <th colSpan={2}>Duration</th>
                    <th colSpan={1}>Key List</th>
                    <th colSpan={2}>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={2}>-</td>
                    <td colSpan={2}>-</td>
                    <td colSpan={1}>-</td>
                    <td colSpan={2}>-</td>
                    <td colSpan={2}>-</td>
                    <td colSpan={2}>-</td>
                    <td colSpan={2}>-</td>
                    <td colSpan={1}>-</td>
                    <td colSpan={2}>-</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default LogTable