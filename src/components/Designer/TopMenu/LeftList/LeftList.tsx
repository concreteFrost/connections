import View from "./View/View";
import s from "./LeftList.module.scss";
import { UpdateFlowProcedures } from "../../../Modals/UpdateFlowModal";

function LeftList(props: any) {

  return (
    <div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_item} onClick={() => props.defineUpdateFlowProcedure(UpdateFlowProcedures.New)}>New</li>
        <li className={s.nav_list_item} onClick={() => props.setIsSelectFlowVisible(true)}>Load</li>
        <li className={s.nav_list_item} onClick={() => props.defineUpdateFlowProcedure(UpdateFlowProcedures.Save)}>Save</li>
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

export default LeftList;