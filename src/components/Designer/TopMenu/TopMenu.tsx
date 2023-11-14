import s from "./TopMenu.module.scss";
import LeftList from "./LeftList/LeftList";
import Settings from "./Settings/Settings";
import useStore from "../../../store/store";
import UpdateFlowModal, { UpdateFlowProps } from "../../Modals/UpdateFlowModal";
import { useState } from "react";
import FlowsList from "./LeftList/FlowsList/FlowsList";
import MessageModal from "../../Modals/MessageModal";
import { checkExistingFlowInDataBase } from "../../../store/actions/utils/flowUtils";

function TopMenu() {
  const dropdowns = useStore((state) => state.topPanelSlice.dropdowns);
  const toggleDropdown = useStore((state) => state.topPanelSlice.toggleDropdown);
  const {saveDraftFlow,loadFlowFromDraft,createFlow} = useStore((store)=>store.flowSlice);
  const {toggleUpdateFlowModal, toggleMessageModal} = useStore((store)=>store.modalWindowsSlice);

  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  const flow = useStore((state)=>state.flowSlice.flow);
  const [functionsToPass, _setFunctionsToPass] = useState<UpdateFlowProps>({ confirm: () => { }, decline: () => { } });

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  function setFunctionsToPass(functions: UpdateFlowProps) {
    _setFunctionsToPass(functions);
  }

  async function tryToSaveFlow() {
    try {
      const match = await checkExistingFlowInDataBase(flow.flowName);
      await saveDraftFlow(match, "new folder");
      await toggleUpdateFlowModal(false);
    } catch (error) {
      console.error("error on trying to save load", error);
    }
  }

  const saveAndLoad = async () => {
    try {
      await tryToSaveFlow();
      await loadFlowFromDraft(localStorage.getItem("flowIdToLoad")?.toString()!);
      await toggleUpdateFlowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const loadWithoutSaving = async () => {
    try {
      await loadFlowFromDraft(localStorage.getItem("flowIdToLoad")?.toString()!);
      await toggleUpdateFlowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <LeftList
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
          setFunctionsToPass={setFunctionsToPass}
          setIsSelectFlowsVisible={setIsSelectFlowVisible}
          tryToSaveFlow={tryToSaveFlow}
          toggleUpdateFlowModal={toggleUpdateFlowModal}
          toggleMessageModal={toggleMessageModal}
          createFlow={createFlow}
        ></LeftList>
        <Settings
          dropdowns={dropdowns}
          toggleDropdown={toggleDropdown}
        ></Settings>
      </div>
      {isSelectFlowVisible ? <FlowsList
        closeSelecFlowModal={closeSelectFlowModal}
        setFunctionsToPass={setFunctionsToPass}
        saveAndLoad={saveAndLoad}
        loadWithoutSaving={loadWithoutSaving}
        toggleUpdateFlowModal={toggleUpdateFlowModal}
      ></FlowsList> : null}
      <UpdateFlowModal confirm={functionsToPass.confirm} decline={functionsToPass.decline} />
      <MessageModal></MessageModal>
    </div>
  );
}

export default TopMenu;
