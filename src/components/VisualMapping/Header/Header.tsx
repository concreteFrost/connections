import s from "./Header.module.scss";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  function handleButtonClick() {
    navigate("/dashboard/designer");
  }
  return (
    <div className={s.container}>
      <div className={s.grid}>
        <button onClick={handleButtonClick}>DESIGNER</button>
        <span>VISUAL MAPPING TOOL</span>
      </div>
    </div>
  );
}

export default Header;
