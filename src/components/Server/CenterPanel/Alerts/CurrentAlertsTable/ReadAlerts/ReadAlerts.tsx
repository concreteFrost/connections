import { Alert } from "shared/interfaces/IAlerts";
import { useState } from "react";

interface ReadAlertsProps {
  alerts: Array<Alert> | undefined;
  handleAlertDelete: (alrttId: number) => void;
  s: any;
}

function ReadAlerts({ alerts, handleAlertDelete, s }: ReadAlertsProps) {
  const [isListVisible, setListVisible] = useState<boolean>(false);

  return (
    <>
      <main>
        <header>Read</header>
        <button
          className={s.toggle_read_btn}
          onClick={() => setListVisible(!isListVisible)}
        >
          {isListVisible ? "Hide" : "Show"}
        </button>
        {isListVisible ? (
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
        ) : null}
      </main>
    </>
  );
}

export default ReadAlerts;
