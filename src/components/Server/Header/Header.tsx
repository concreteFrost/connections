import Profile from "../../Profile/Profile";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {

  const navigate = useNavigate();
  return (
    <div className={s.wrapper}>
      <div className={s.nav_btns_wrapper}>
        <div className={s.designer_button}>
          <button onClick={() => {
            navigate('/designer')
          }}>DESIGNER</button>
        </div>
        <div className={s.alerts_button}>
          <button onClick={() => {
            navigate('/alerts')
          }}>NOTIFICATIONS</button>
        </div>
      </div>
      <header className={s.title}>CONNECTIONS SERVER DASHBOARD</header>
      <div className={s.logout_container}>
        <Profile></Profile>
      </div>

    </div>
  );
}

export default Header;
