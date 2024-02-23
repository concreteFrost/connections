import s from "./AlertConfigure.module.scss";
import { useNavigate } from "react-router";
import DirectivesTable from "./DirectivesTable/DirectivesTable";
import AddDirectiveForm from "./AddDirectiveForm/AddDirectiveForm";
function AlertConfigure() {
  const navigate = useNavigate();
  return (
    <section className={s.wrapper}>
         <header><button onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
         <AddDirectiveForm></AddDirectiveForm>
         <DirectivesTable></DirectivesTable>
    </section>
  );
}

export default AlertConfigure;

