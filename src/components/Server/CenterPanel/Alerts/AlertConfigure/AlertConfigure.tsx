import s from "./AlertConfigure.module.scss";
import { useNavigate } from "react-router";
import DirectivesControl from "./DirectivesControl/DirectivesControl";
import AlertFormatControl from "./AlertFormat/AlertFormatControl";
function AlertConfigure() {
  const navigate = useNavigate();

  return (
  <section className={s.wrapper}>
      <header><button className={s.alerts_btn} onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
      <AlertFormatControl></AlertFormatControl>
      <DirectivesControl></DirectivesControl>
    </section>
  );
}

export default AlertConfigure;

