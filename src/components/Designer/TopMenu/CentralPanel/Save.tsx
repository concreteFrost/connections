import useStore from "store/store";
import s from "../DesignerNav.module.scss";

function Save() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  function closeUpdateFlowModal() {
    modalSlice.toggleUpdateFlowModal(false);
  }

  return (
    <li
      className={s.central_nav_btn}
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
