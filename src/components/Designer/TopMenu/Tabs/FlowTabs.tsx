import useStore from "store/store";
import s from "./FlowTabs.module.scss";
import { RFState } from "store/types/rfState";
import { FlowStructure } from "store/interfaces/Iflow";
import { useEffect } from "react";

function FlowTabs() {
  const {
    allFlows,
    closeFlow,
    getFlowFromSnapshot,
    takeFlowSnapshot,
    flow,
    removeFromTab,
  } = useStore((state: RFState) => state.flowSlice);
  const { toggleUpdateFlowModal, setUpdateFlowModalActions } = useStore(
    (state: RFState) => state.modalWindowsSlice
  );

  function handleTabClick(flowToGet: FlowStructure) {
    takeFlowSnapshot(flow);
    getFlowFromSnapshot(flowToGet);
  }

  function handleTabClosure(flowId:string){
    removeFromTab(flowId);
    const availableFlowIndex = allFlows.length -1;

    if(availableFlowIndex !==0){
      getFlowFromSnapshot(allFlows[allFlows.length-1]);
    }
    else{
      closeFlow();
    }
   
  }

  function closeUpdateFlowModal(flowId: string) {
    toggleUpdateFlowModal(true);
    setUpdateFlowModalActions({save:()=>{handleTabClosure(flowId)},discard:()=>handleTabClosure(flowId)});
  }

  return (
    <ul className={s.tabs}>
      {allFlows.length > 0
        ? allFlows.map((flow) => (
            <li key={flow.flowIdentifier} >
              <div className={s.tab_name} onClick={() => handleTabClick(flow)}>{flow.flowName}</div>
              <div className={s.close_tab_btn}>
                <button
                  onClick={() => closeUpdateFlowModal(flow.flowIdentifier)}
                >
                  x
                </button>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}

export default FlowTabs;
