import {
  disableFlowAPI,
  enableFlowAPI,
  restartFlowAPI,
  startFlowAPI,
  stopFlowAPI,
  terminateFlowAPI,
} from "api/flow";
import useStore from "store/store";
import { useParams } from "react-router";

export interface FlowControlProps {
  className: any;
  status: number;
}

function FlowControl(props: FlowControlProps) {
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const { setIsLoading } = useStore((state) => state.loaderSlice);
  const { id }: any = useParams();

  async function enableFlow() {
    try {
      await enableFlowAPI(id);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function disableFlow() {
    try {
      await disableFlowAPI(id);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  }

  async function startFlow() {
    try {
      const res: any = await startFlowAPI(id);
      setIsLoading(true);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function stopFlow() {
    try {
      const res: any = await stopFlowAPI(id);
      setIsLoading(true);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error stopping flow", error);
    }
  }

  async function restartFlow() {
    try {
      const res: any = await restartFlowAPI(id);
      setIsLoading(true);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error stopping flow", error);
    }
  }

  async function terminateFlow() {
    try {
      const res: any = await terminateFlowAPI(id);
      setIsLoading(true);
      if (res.data.message.length > 0) {
        toggleMessageModal(res.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error stopping flow", error);
    }
  }

  function defineAction(e: any) {
    const action = e.target.value;
    switch (action) {
      case "0":
        disableFlow();
        break;
      case "1":
        enableFlow();
        break;
      case "2":
        restartFlow();
        break;
      case "3":
        terminateFlow();
    }
  }
  return (
    <div className={props.className.flow_control}>
      <header>Flow Control</header>
      <div className={props.className.start_stop_wrapper}>
        {props.status !== 0 ? (
          <>
            {" "}
            <button onClick={startFlow}>START</button>{" "}
            <button onClick={stopFlow}>STOP</button>{" "}
          </>
        ) : null}
      </div>
      <select
        data-testid="test_select_change_flow_status"
        onChange={(e) => {
          defineAction(e);
        }}
        value={props.status === 0 ? "0" : "1"}
      >
        <option value="0">Disabled</option>
        <option value="1">Enabled</option>
        <option value="2">Restart</option>
        <option value="3">Terminate</option>
      </select>
    </div>
  );
}

export default FlowControl;
