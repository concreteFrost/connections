
import useStore from "store/store";

function Close() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  function saveAndClose() {
    flowSlice.closeFlow();
  }

  function closeFlowWithoutSaving() {
    flowSlice.closeFlow();
    modalSlice.toggleUpdateFlowModal(false);
  }

  return (
    <li
      
      onClick={() => {
        if (flowSlice.flow.flowIdentifier) {
          modalSlice.toggleUpdateFlowModal(true);
          modalSlice.setUpdateFlowModalActions({
            save: saveAndClose,
            discard: closeFlowWithoutSaving,
          });
        }
      }}
    >
      Close
    </li>
  );
}

export default Close;
