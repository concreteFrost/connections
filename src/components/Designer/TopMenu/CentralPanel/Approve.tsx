import useStore from "store/store";

function Approve() {
  const { draft } = useStore((state) => state.flowSlice);
  const {setApproveFlowModalMessage, toggleApproveFlowModal } = useStore((state) => state.modalWindowsSlice);
  function handleToggleApproveModal(){
    toggleApproveFlowModal(true,draft.draftId!);
    setApproveFlowModalMessage("")
  }
  
  return <>{draft.draftId !== null && draft.canApprove ? <button onClick={handleToggleApproveModal}>APPROVE</button> : null}</>;
}

export default Approve;
