import useStore from "store/store";
import s from "../DesignerNav.module.scss";
import { useNavigate } from "react-router";

function VM() {
  const navigate = useNavigate();
  return (
    <li
      className={s.central_nav_btn}
      onClick={() => {
        navigate("/dashboard/visual-mapping");
      }}
    >
      VM
    </li>
  );
}

export default VM;
