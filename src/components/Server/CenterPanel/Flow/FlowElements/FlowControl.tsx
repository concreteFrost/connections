import { useState } from "react";
import {
  disableFlowAPI,
  enableFlowAPI,
  startFlowAPI,
  stopFlowAPI,
} from "api/flow";
import useStore from "store/store";
import { useParams } from "react-router";

interface FlowControlProps {
  className: any;
  status: number;
}

function FlowControl(props: FlowControlProps) {
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { id }: any = useParams();

  async function enableFlow() {
    try {
      await enableFlowAPI(id);
    } catch (e) {
      console.log(e);
    }
  }

  async function disableFlow() {
    try {
      await disableFlowAPI(id);
    } catch (e) {
      console.log(e);
    }
  }

  async function startFlow() {
    try {
      const res: any = await startFlowAPI(id);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function stopFlow() {
    try {
      const res: any = await stopFlowAPI(id);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
      }
    } catch (error) {
      console.log("error stopping flow", error);
    }
  }

  function defineAction(e: any) {
    const action = e.target.value;
    action === "1" ? enableFlow() : disableFlow();
  }
  return (
    <div className={props.className.flow_control}>
      <header>Flow Control</header>
      <div className={props.className.start_stop_wrapper}>
        {props.status !==0 ? (
          <>
            {" "}
            <button onClick={startFlow}>START</button>{" "}
            <button onClick={stopFlow}>STOP</button>{" "}
          </>
        ) : null}
      </div>
      <select
        onChange={(e) => {
          defineAction(e);
        }}
        value={props.status === 0 ? "0" : "1"}
      >
        <option value="0">Disabled</option>
        <option value="1">Enabled</option>
      </select>
    </div>
  );
}

export default FlowControl;
