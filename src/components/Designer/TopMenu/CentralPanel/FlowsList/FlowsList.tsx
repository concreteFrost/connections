import s from "./FlowsList.module.scss";
import { useEffect, useState } from "react";
import {
  UpdateFlowActions,
  UpdateFlowProps,
} from "../../../../Modals/UpdateFlowModal";
import DraftFlows from "./DraftFlows/DraftFlows";
import LiveFlows from "./LiveFlows/LiveFlows";

interface ILoadedFlow {
  flowId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface FlowListProps {
  closeSelecFlowModal: () => void;
  toggleUpdateFlowModal: (isVisible: boolean) => void;
  setCurrentActions: (actions: UpdateFlowActions) => void;
  setFlowIdToLoad: (flowId: string) => void;
}

function FlowsList(props: FlowListProps) {
  function handleDraftClick(flowIdToLoad: string) {
    props.toggleUpdateFlowModal(true);
    props.setFlowIdToLoad(flowIdToLoad);
    props.setCurrentActions(UpdateFlowActions.LoadDraft);
  }

  function handleLiveClick(flowIdToLoad: string) {
    props.toggleUpdateFlowModal(true);
    props.setFlowIdToLoad(flowIdToLoad);
    props.setCurrentActions(UpdateFlowActions.LoadLive);
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
        <button onClick={props.closeSelecFlowModal}>Close</button>
      </div>
    </div>
  );
}

export default FlowsList;
