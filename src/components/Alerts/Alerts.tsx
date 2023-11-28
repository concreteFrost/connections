import Header from "./Header/Header";
import s from "./Alerts.module.scss";
import CurrentAlerts from "./CurrentAlerts/CurrentAlerts";
import AlertEditor from "./AlertEditor/AlertEditor";

function Alerts() {
  return (
    <div className={s.wrapper}>
      <Header></Header>
      <div className={s.content}>
        <CurrentAlerts></CurrentAlerts>
        <AlertEditor></AlertEditor>
      </div>
    </div>
  );
}

export default Alerts;
