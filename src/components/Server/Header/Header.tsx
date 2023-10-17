import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {

    const navigate=useNavigate();
  return (
    <div className={s.wrapper}>
      <header>CONNECTIONS SERVER DASHBOARD</header>
      <div className={s.designer_button}>
      <button onClick={()=>navigate('/designer')}>DESIGNER</button>
      </div>
      
    </div>
  );
}

export default Header;
