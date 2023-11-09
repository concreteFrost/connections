import View from "./View/View";
import s from "./LeftList.module.scss";
import useStore from "../../../../store/store";
import FlowsList from "./FlowsList/FlowsList";
import { useState } from "react";
import MessageModal from "../../../Modals/MessageModal";
import UpdateFlowModal from "../../../Modals/UpdateFlowModal";

import { UpdateFlowProcedures } from "../../../Modals/UpdateFlowModal";

function LeftList(props: any) {

  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal)
  const [updateFlowProcedures, setUpdateFlowProcedures] = useState<UpdateFlowProcedures | null>(null);

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  const defineUpdateFlowProcedure = (procedure: UpdateFlowProcedures) => {
    toggleUpdateFlowModal(true)
    setUpdateFlowProcedures(procedure);
  }

  return (
    <div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_item} onClick={() => defineUpdateFlowProcedure(UpdateFlowProcedures.New)}>New</li>
        <li className={s.nav_list_item} onClick={() => setIsSelectFlowVisible(true)}>Load</li>
        <li className={s.nav_list_item} onClick={() => defineUpdateFlowProcedure(UpdateFlowProcedures.Save)}>Save</li>
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
      {isSelectFlowVisible ? <FlowsList closeSelecFlowModal={closeSelectFlowModal}></FlowsList> : null}
      {updateFlowProcedures === UpdateFlowProcedures.New ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.New} />
      ) : null}
      {updateFlowProcedures === UpdateFlowProcedures.Save ? (
        <UpdateFlowModal currentProcedure={UpdateFlowProcedures.Save} />
      ) : null}
      <MessageModal></MessageModal>
    </div>
  );
}

export default LeftList;