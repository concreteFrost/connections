import { FaStop, FaPlay, FaPause } from "react-icons/fa";
import s from "./MiddleButtons.module.scss";

function MiddleButtons() {
  return (
    <div className={s.operations_btn_list}>
      <ul className={s.top_btn_list}>
        <li className={s.top_list_item}>
          <FaPlay color="white"></FaPlay>
        </li>
        <li className={s.top_list_item}>
          <FaStop color="white"></FaStop>
        </li>
        <li className={s.top_list_item}>
          <FaPause color="white"></FaPause>
        </li>
      </ul>
      {/* <div className={s.mode_toggle}><select>
          <option value="debug">DEBUG</option>
          <option value="release">RELEASE</option>p</select></div> */}
    </div>
  );
}

export default MiddleButtons;