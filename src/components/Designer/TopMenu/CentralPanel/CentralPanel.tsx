import View from "./View/View";
import s from "./CentralPanel.module.scss";
import { UpdateFlowActions } from "../../../Modals/UpdateFlowModal";

interface CentralPanelProps {
  setIsSelectFlowsVisible: (isVisible: boolean) => void;
  toggleDropdown: (view: string) => void;
  toggleUpdateFlowModal: (isVisble: boolean) => void;
  setCurrentActions: (actions: UpdateFlowActions) => void;
  dropdowns: any;
}

function CentralPanel(props: CentralPanelProps) {

  return (
    <div className={s.wrapper}>
      <ul className={s.nav_list}>
        <li>
          <div className={s.server_button}>
            <button onClick={() => {
              props.toggleUpdateFlowModal(true)
              props.setCurrentActions(UpdateFlowActions.Quit)
            }}>SERVER</button>
          </div>
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.toggleUpdateFlowModal(true);
            props.setCurrentActions(UpdateFlowActions.Create)
          }}
        >
          New
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.setIsSelectFlowsVisible(true);
          }}
        >
          Load
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.toggleUpdateFlowModal(true);
            props.setCurrentActions(UpdateFlowActions.SaveDraft)
          }}
        >
          Save
        </li>
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
