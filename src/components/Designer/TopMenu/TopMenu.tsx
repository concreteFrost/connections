import s from "./TopMenu.module.scss";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowProps } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsList from "./LeftList/FlowsList/FlowsList";
import MessageModal from "../../Modals/MessageModal";
import actions from "../../../store/actions/combinedActions";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal)
  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  const [functionsToPass, _setFunctionsToPass] = useState<UpdateFlowProps>({ confirm: () => { }, decline: () => { } });

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  function setFunctionsToPass(functions: UpdateFlowProps) {
    _setFunctionsToPass(functions);
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.server_button}>
          <button onClick={() => { }}>SERVER</button>
        </div>
        <LeftList
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          setFunctionsToPass={setFunctionsToPass}
          setIsSelectFlowsVisible={setIsSelectFlowVisible}
        ></LeftList>
        <Settings
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></Settings>
      </div>
      {isSelectFlowVisible ? <FlowsList
        closeSelecFlowModal={closeSelectFlowModal}
        setFunctionsToPass={setFunctionsToPass}
      ></FlowsList> : null}
      <UpdateFlowModal confirm={functionsToPass.confirm} decline={functionsToPass.decline} />
      <MessageModal></MessageModal>
    </div>
  );
}

export default TopMenu;
