import s from "./CentralPanel.module.scss";
import useStore from "../../../../store/store";

function Create() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  function createAndSave() {
    flowSlice.createFlow();
  }

  function createWithoutSaving() {
    flowSlice.createFlow();
    modalSlice.toggleUpdateFlowModal(false);
    modalSlice.toggleLoadFlowModal(false);
  }

  return (
    <li
      className={s.nav_list_item}
      onClick={() => {
        if (flowSlice.flow.flowIdentifier) {
          modalSlice.toggleUpdateFlowModal(true);
          modalSlice.setUpdateFlowModalActions({
            save: createAndSave,
            discard: createWithoutSaving,
          });
        } else {
          flowSlice.createFlow();
        }
      }}
    >
      Create
    </li>
  );
}

export default Create;
