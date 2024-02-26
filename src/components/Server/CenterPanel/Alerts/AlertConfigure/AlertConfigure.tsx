import s from "./AlertConfigure.module.scss";
import { useNavigate } from "react-router";
import DirectivesControl from "./DirectivesControl/DirectivesControl";
function AlertConfigure() {
  const navigate = useNavigate();

  return (
    <section className={s.wrapper}>
      <header><button onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
      <DirectivesControl></DirectivesControl>
    </section>
  );
}

export default AlertConfigure;

