import Logout from "../../Logout/Logout";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {

  const navigate = useNavigate();
  return (
    <div className={s.wrapper}>
      <header>ALERTS</header>
      <div className={s.server_button}>
        <button onClick={() => {
          navigate('/server')
        }}>SERVER</button>
      </div>
      <div className={s.designer_button}>
        <button onClick={() => {
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
