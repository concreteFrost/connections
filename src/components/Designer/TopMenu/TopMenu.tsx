import s from "./TopMenu.module.scss";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowProcedures } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsList from "./LeftList/FlowsList/FlowsList";
import MessageModal from "../../Modals/MessageModal";


function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal)
  const [updateFlowProcedures, setUpdateFlowProcedures] = useState<UpdateFlowProcedures | null>(null);

  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);

  const [flowToLoad, _setFlowToLoad] = useState<string>('');

  const defineUpdateFlowProcedure = (procedure: UpdateFlowProcedures) => {
    toggleUpdateFlowModal(true)
    setUpdateFlowProcedures(procedure);
  }

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  function setFlowToLoad(flowID: string) {
    _setFlowToLoad(flowID);
  }

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.server_button}>
          <button onClick={() => defineUpdateFlowProcedure(UpdateFlowProcedures.Quit)}>SERVER</button>
        </div>
        <LeftList
          defineUpdateFlowProcedure={defineUpdateFlowProcedure}
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          setIsSelectFlowVisible={setIsSelectFlowVisible}
        ></LeftList>
        <Settings
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></Settings>
      </div>
      {isSelectFlowVisible ? <FlowsList
        closeSelecFlowModal={closeSelectFlowModal}
        setFlowToLoad={setFlowToLoad}
        defineUpdateFlowProcedure={defineUpdateFlowProcedure}
      ></FlowsList> : null}
      {updateFlowProcedures === UpdateFlowProcedures.New ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.New} />
      ) : null}
      {updateFlowProcedures === UpdateFlowProcedures.Save ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.Save} />
      ) : null}
      {updateFlowProcedures === UpdateFlowProcedures.Quit ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.Quit} />
      ) : null}
      {updateFlowProcedures === UpdateFlowProcedures.Load ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.Load} flowToLoadID={flowToLoad} toggleLoadFlowModal={closeSelectFlowModal} />
      ) : null}

      <MessageModal></MessageModal>
    </div>
  );
}

export default TopMenu;
