import useStore from "store/store";
import s from "../DesignerNav.module.scss";
function Load() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  return (
    <li
      className={s.central_nav_btn}
      onClick={() => {
        modalSlice.toggleLoadFlowModal(true);
      }}
    >
      Load
    </li>
  );
}

export default Load;
