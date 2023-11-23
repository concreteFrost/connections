import s from "./FlowsListModal.module.scss";
import { UpdateFlowActions } from "../UpdateFlowModal";
import DraftFlows from "./FlowsList/DraftFlows/DraftFlows";
import LiveFlows from "./FlowsList/LiveFlows/LiveFlows";
import useStore from "../../../store/store";

interface ILoadedFlow {
  flowId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface FlowListProps {
  toggleUpdateFlowModal: (isVisible: boolean) => void;
  setCurrentActions: (actions: UpdateFlowActions) => void;
  setFlowIdToLoad: (flowId: string) => void;
}

function FlowsListModal(props: FlowListProps) {
  const toggleLoadFlowModal = useStore((state) => state.modalWindowsSlice.toggleLoadFlowModal);
  const flowId = useStore((state) => state.flowSlice.flow.flowIdentifier);
  const loadFlowFromDraft = useStore((state) => state.flowSlice.loadFlowFromDraft);
  const loadFlowFromLive = useStore((state) => state.flowSlice.createUpdateDraftFromLiveTemplate);

  function handleDraftClick(flowIdToLoad: string) {
    if (flowId) {
      props.toggleUpdateFlowModal(true);
      props.setFlowIdToLoad(flowIdToLoad);
      props.setCurrentActions(UpdateFlowActions.LoadDraft);
    }
    else {
      loadFlowFromDraft(flowIdToLoad)
    }

  }

  function handleLiveClick(flowIdToLoad: string) {
    if (flowId) {
      props.toggleUpdateFlowModal(true);
      props.setFlowIdToLoad(flowIdToLoad);
      props.setCurrentActions(UpdateFlowActions.LoadLive);
    }
    else {
      loadFlowFromLive(flowIdToLoad)
    }

  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3>Select Flow</h3>
      </div>
      <div className={s.body}>
        <DraftFlows handleDraftClick={handleDraftClick} />
        <LiveFlows handleLiveFlowClick={handleLiveClick} />
      </div>
      <div className={s.footer}>
        <button onClick={() => toggleLoadFlowModal(false)}>Close</button>
      </div>
    </div>
  );
}

export default FlowsListModal;
