import s from "./CurrentAlertsTable.module.scss";
import { useNavigate } from "react-router";

function CurrentAlertsTable() {

  const navigate= useNavigate()
  return (
    <section className={s.wrapper}>
      <h3>Current Alerts</h3>
      <header><button onClick={()=>navigate('configure')}>CONFIGURE</button></header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th colSpan={2}>Message</th>
              <th>Priority</th>
              <th>App Status</th>
              <th>Email Status</th>
              <th>User Status</th>
              <th>Logged</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-</td>
              <td colSpan={2}>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </main>
    </section>
  );
}

export default CurrentAlertsTable;
