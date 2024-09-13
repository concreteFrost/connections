import s from "./FlowsListModal.module.scss";
import DraftFlows from "./FlowsList/DraftFlows/DraftFlows";
import LiveFlows from "./FlowsList/LiveFlows/LiveFlows";
import useStore from "store/store";

function FlowsListModal() {
  const { toggleLoadFlowModal } = useStore((state) => state.modalWindowsSlice);
  const loadFlowModal = useStore(
    (state) => state.modalWindowsSlice.loadFlowModal
  );

  return (
    <>{loadFlowModal.isVisible ? 
    <div className={s.container}>
      <div className={s.header}>
        <h3>Select Flow</h3>
      </div>
      <div className={s.body}>
        <DraftFlows />
        <LiveFlows />
      </div>
      <div className={s.footer}>
        <button onClick={() => toggleLoadFlowModal(false)}>Close</button>
      </div>
    </div> : null}
    </>
  );
}

export default FlowsListModal;
