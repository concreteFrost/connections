import { FlowStructure } from "store/interfaces/Iflow";
import s from "../DesignerNav.module.scss";
import useStore from "store/store";

function Create() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  function createAndSave() {
    flowSlice.takeFlowSnapshot(flowSlice.flow);

    const newFlow: FlowStructure = flowSlice.createFlow();
    flowSlice.addFlowToTabs(newFlow);
  }

  function createWithoutSaving() {
    const newFlow: FlowStructure = flowSlice.createFlow();
    flowSlice.addFlowToTabs(newFlow);
    modalSlice.toggleUpdateFlowModal(false);
    modalSlice.toggleLoadFlowModal(false);
  }

  return (
    <li
      className={s.central_nav_btn}
      onClick={() => {
        // if (flowSlice.flow.flowIdentifier) {
        //   modalSlice.toggleUpdateFlowModal(true);
        //   modalSlice.setUpdateFlowModalActions({
        //     save: createAndSave,
        //     discard: createWithoutSaving,
        //   });
        // } else {
        //   flowSlice.createFlow();
        // }

        if (flowSlice.allFlows?.length === 0) createWithoutSaving();
        else createAndSave();
      }}
    >
      Create
    </li>
  );
}

export default Create;
