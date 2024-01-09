import s from "./CentralPanel.module.scss";
import useStore from "../../../../store/store";

function Save() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  function closeUpdateFlowModal() {
    modalSlice.toggleUpdateFlowModal(false);
  }

  return (
    <li
      className={s.nav_list_item}
      onClick={() => {
        modalSlice.toggleUpdateFlowModal(true);
        modalSlice.setUpdateFlowModalActions({
          save: () => {},
          discard: closeUpdateFlowModal,
        });
      }}
    >
      Save
    </li>
  );
}

export default Save;
