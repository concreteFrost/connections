import View from "./View/View";
import s from "./CentralPanel.module.scss";
import { UpdateFlowActions } from "../../../Modals/UpdateFlowModal";
import useStore from "../../../../store/store";
import { useNavigate } from "react-router";

interface CentralPanelProps {
  toggleDropdown: (view: string) => void;
  toggleUpdateFlowModal: (isVisble: boolean) => void;
  setCurrentActions: (actions: UpdateFlowActions) => void;
  dropdowns: any;
}

function CentralPanel(props: CentralPanelProps) {

  const toggleLoadFlowModal = useStore((state) => state.modalWindowsSlice.toggleLoadFlowModal);
  const { closeFlow, createFlow } = useStore((state) => state.flowSlice);

  const flowIdentifier = useStore((state) => state.flowSlice.flow.flowIdentifier);
  const navigate = useNavigate();

  function switchToTheServer() {
    if (flowIdentifier) {
      props.toggleUpdateFlowModal(true)
      props.setCurrentActions(UpdateFlowActions.Quit)
    }
    else {
      navigate('/dashboard/server')
    }
  }

  function openFlowModal() {
    toggleLoadFlowModal(true);
  }

  function handleCloseFlow() {
    if (flowIdentifier) {
      props.toggleUpdateFlowModal(true);
      props.setCurrentActions(UpdateFlowActions.Close);

    }
    else {
      closeFlow();
    }
  }

  function handleCreateFlow() {
    if (flowIdentifier) {
      props.toggleUpdateFlowModal(true);
      props.setCurrentActions(UpdateFlowActions.Create)
    }
    else {
      createFlow();
    }
  }

  function handleSaveFlow() {
    props.toggleUpdateFlowModal(true);
    props.setCurrentActions(UpdateFlowActions.SaveDraft)
  }

  return (
    <div className={s.wrapper}>
      <ul className={s.nav_list}>
        {/*SERVER */}
        <li>
          <div className={s.server_button}>
            <button onClick={switchToTheServer}>SERVER</button>
          </div>
        </li>
        {/*CREATE */}
        <li
          className={s.nav_list_item}
          onClick={handleCreateFlow}
        >
          Create
        </li>
        {/*LOAD */}
        <li
          className={s.nav_list_item}
          onClick={openFlowModal}
        >
          Load
        </li>
        {/*SAVE */}
        {flowIdentifier ? <li
          className={s.nav_list_item}
          onClick={handleSaveFlow}
        >
          Save
        </li> : null}
        {/*CLOSE*/}
        {flowIdentifier ? <li
          className={s.nav_list_item}
          onClick={handleCloseFlow}
        >
          Close
        </li> : null}

        {/*VIEW */}
        <li className={s.nav_list_item}>
          <div onClick={() => props.toggleDropdown("view")}>View</div>
          <div
            className={
              props.dropdowns.view.isVisible ? null : s.view_section_hidden
            }
          >
            <View />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CentralPanel;
