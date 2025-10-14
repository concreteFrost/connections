import { connectionsIcons } from "assets/icons/icons";
import s from "./Header.module.scss";
import { useNavigate } from "react-router";
import useStore from "store/store";
import { RFState } from "store/types/rfState";

function Header() {
  const { isOpened, setOpened } = useStore(
    (state: RFState) => state.codeEditorSlice
  );

  const navigate = useNavigate();

  function handleSetEditorOpened() {
    setOpened(!isOpened);
  }
  function handleButtonClick() {
    navigate("/dashboard/designer");
  }
  return (
    <div className={s.container}>
      <div className={s.grid}>
        <div className={s.first_col}>
          <button onClick={handleButtonClick}>DESIGNER</button>
        </div>

        <div className={s.second_col}>
          <span>VISUAL MAPPING TOOL</span>
        </div>

        <div className={s.third_col}>
          <button onClick={handleSetEditorOpened}>
            {connectionsIcons.code}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
