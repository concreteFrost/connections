import { Alert } from "store/interfaces/IAlerts"

interface UnreadAlertsProps{
    alerts: Array<Alert>|undefined,
    handleMarkAsRead:(alertId: number)=>void,
    handleAlertDelete:(alrttId:number)=>void,
    s:any
}

function UnreadAlerts({alerts,handleMarkAsRead, handleAlertDelete,s} : UnreadAlertsProps){
    return(
        <>
      <main>
        <header>Unread</header>
        <table>
          <thead>
            <tr>
              <th colSpan={4}>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts && alerts?.length > 0 ? (
              alerts?.map((element: Alert) => (
                <tr key={alerts.indexOf(element)}>
                  <td colSpan={4}>{element.messageText}</td>
                  <td>
                    <div className={s.actions_btn_wrapper}>
                      <button
                        className={s.read_btn}
                        onClick={() => handleMarkAsRead(element.alertId)}
                      >
                        READ
                      </button>
                      <button
                        className={s.delete_btn}
                        onClick={() => handleAlertDelete(element.alertId)}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>-</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </main></>
    )
}

export default UnreadAlerts;