import s from "./AlertConfigure.module.scss";
import { useNavigate } from "react-router";
import DirectivesControl from "./DirectivesControl/DirectivesControl";
import AlertFormatTable from "./AlertFormat/AlertFormatTable/AlertFormatTable";
import AlertFormat from "./AlertFormat/AlertFormat";
function AlertConfigure() {
  const navigate = useNavigate();

  return (
    <section className={s.wrapper}>
      <header><button className={s.alerts_btn} onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
      <AlertFormat></AlertFormat>
      <DirectivesControl></DirectivesControl>
    </section>
  );
}

export default AlertConfigure;

