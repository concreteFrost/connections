import useStore from "store/store";
import { useNavigate } from "react-router";

function SwitchToServerView() {
  const navigate = useNavigate();
  const flowSlice = useStore((state) => state.flowSlice);

  function saveAndLeave() {
    navigate("/dashboard/server");

    flowSlice.takeFlowSnapshot(flowSlice.flow);
  }

  return (
    <li>
      <button
        onClick={() => {
          saveAndLeave();
        }}
      >
        SERVER
      </button>
    </li>
  );
}

export default SwitchToServerView;
