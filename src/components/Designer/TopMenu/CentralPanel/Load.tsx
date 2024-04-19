import s from "./CentralPanel.module.scss";
import useStore from "../../../../store/store";;

function Load() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  return (
    <li
      className={s.nav_list_item}
      onClick={() => {
        modalSlice.toggleLoadFlowModal(true);
      }}
    >
      Load
    </li>
  );
}

export default Load;
