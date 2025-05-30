import useStore from "store/store";

function Close() {
  const { modalWindowsSlice, flowSlice } = useStore((state) => state);

  function saveAndClose() {
    flowSlice.closeFlow();
  }

  function closeFlowWithoutSaving() {
    flowSlice.closeFlow();
    modalWindowsSlice.toggleUpdateFlowModal(false);
  }

  return (
    <li
      onClick={() => {
        if (flowSlice.flow.flowIdentifier) {
          modalWindowsSlice.toggleUpdateFlowModal(true);
          modalWindowsSlice.setUpdateFlowModalActions({
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
