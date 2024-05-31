import { useState } from "react";
import {
  disableFlowAPI,
  enableFlowAPI,
  startFlowAPI,
  stopFlowAPI,
} from "../../../../../api/flow";
import { FlowData } from "../../../../../store/interfaces/Iflow";
import useStore from "../../../../../store/store";

interface FlowControlProps {
  className: any;
}

function FlowControl(props: FlowControlProps) {
  const currentFlow = useStore(
    (state) => state.serverSlice.currentFlow
  ) as FlowData;
  const toggleFlowControlState = useStore(
    (state) => state.serverSlice.toggleFlowControlState
  );
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  const [canStartFlow, setCanStartFlow] = useState<boolean>(true);

  async function enableFlow() {
    try {
      await enableFlowAPI(currentFlow.flowIdentifier);
      toggleFlowControlState(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function disableFlow() {
    try {
      await disableFlowAPI(currentFlow.flowIdentifier);
      toggleFlowControlState(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function startFlow() {
    setCanStartFlow(false);
    try {
      const res: any = await startFlowAPI(currentFlow.flowIdentifier);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function stopFlow() {
    setCanStartFlow(true);
    try {
      const res: any = await stopFlowAPI(currentFlow.flowIdentifier);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
      }
    } catch (error) {
      console.log("error stopping flow", error);
    }
  }

  function defineAction(e: any) {
    const action = e.target.value;
    action === "enabled" ? enableFlow() : disableFlow();
  }
  return (
    <div className={props.className.flow_control}>
      <header>Flow Control</header>
      <div className={props.className.start_stop_wrapper}>
        <button onClick={startFlow}>START</button>{" "}
        <button onClick={stopFlow}>STOP</button>
      </div>
      <select
        onChange={(e) => {
          defineAction(e);
        }}
        value={currentFlow.isEnabled ? "enabled" : "disabled"}
      >
        <option value="disabled">Disabled</option>
        <option value="enabled">Enabled</option>
      </select>
    </div>
  );
}

export default FlowControl;
