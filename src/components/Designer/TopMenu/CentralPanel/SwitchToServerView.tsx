import useStore from "../../../../store/store";
import s from "./CentralPanel.module.scss";
import { useNavigate } from "react-router";

function SwitchToServerView() {
  const navigate = useNavigate();
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  function saveAndLeave() {
    navigate("/dashboard/servers");
    modalSlice.toggleMessageModal();
  }

  function leaveWithoutSaving() {
    modalSlice.toggleUpdateFlowModal(false);
    modalSlice.toggleLoadFlowModal(false);
    flowSlice.closeFlow();
    navigate("/dashboard/servers");
  }

  return (
    <li>
      <div className={s.server_button}>
        <button
          onClick={() => {
            if (flowSlice.flow.flowIdentifier) {
              modalSlice.toggleUpdateFlowModal(true);
              modalSlice.setUpdateFlowModalActions({
                save: saveAndLeave,
                discard: leaveWithoutSaving,
              });
            } else {
              flowSlice.closeFlow();
              navigate("/dashboard/servers");
            }
          }}
        >
          SERVER
        </button>
      </div>
    </li>
  );
}

export default SwitchToServerView;
