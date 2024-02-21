import s from "./Alerts.module.scss";
import CurrentAlertsTable from "./CurrentAlertsTable/CurrentAlertsTable";

function Alerts() {
  return (
    <div className={s.wrapper}>
        <button>CONFIGURE</button>
        <CurrentAlertsTable></CurrentAlertsTable>
    </div>
  );
}

export default Alerts;
