import useStore from "store/store";

function Approve() {
  const { draft } = useStore((state) => state.flowSlice);
  const { setApproveFlowModalMessage, toggleApproveFlowModal } = useStore(
    (state) => state.modalWindowsSlice
  );
  function handleToggleApproveModal() {
    toggleApproveFlowModal(true, draft.draftId!);
    setApproveFlowModalMessage("");
  }

  return (
    <li style={{ listStyle: "none" }}>
      {draft.draftId !== null && draft.canApprove ? (
        <button onClick={handleToggleApproveModal}>APPROVE</button>
      ) : null}
    </li>
  );
}

export default Approve;
