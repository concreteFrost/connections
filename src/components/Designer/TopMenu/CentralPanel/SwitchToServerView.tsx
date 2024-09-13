import useStore from "store/store";
import s from "./CentralPanel.module.scss";
import { useNavigate } from "react-router";

function SwitchToServerView() {
  const navigate = useNavigate();
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  function saveAndLeave() {
    navigate("/dashboard/server");
    // modalSlice.toggleMessageModal("");
    flowSlice.takeFlowSnapshot(flowSlice.flow)
  }

  // function leaveWithoutSaving() {
  //   modalSlice.toggleUpdateFlowModal(false);
  //   modalSlice.toggleLoadFlowModal(false);
  //   flowSlice.closeFlow();
  //   navigate("/dashboard/server");
  // }

  return (
    <li>
      <button onClick={() => {saveAndLeave()}}>SERVER</button>
    </li>
  );
}

export default SwitchToServerView;
