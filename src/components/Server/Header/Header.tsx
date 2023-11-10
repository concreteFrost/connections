import useStore from "../../../store/store";
import Logout from "../../Logout/Logout";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {

  const createFlow = useStore((state) => state.flowSlice.createFlow);

  const navigate = useNavigate();
  return (
    <div className={s.wrapper}>
      <header>CONNECTIONS SERVER DASHBOARD</header>
      <div className={s.designer_button}>
        <button onClick={() => {
          createFlow();
          navigate('/designer')
        }}>DESIGNER</button>
      </div>
      <div className={s.logout_container}>
        <Logout></Logout>
      </div>

    </div>
  );
}

export default Header;
