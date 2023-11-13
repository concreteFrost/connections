import View from "./View/View";
import s from "./LeftList.module.scss";
import { UpdateFlowProcedures } from "../../../Modals/UpdateFlowModal";

interface LeftListProps {
  setFunctionsToPass: (functions: any) => void,
  setIsSelectFlowsVisible: (isVisible: boolean) => void,
  toggleDropdown: (view: string) => void,
  dropdowns: any
}

function LeftList(props: LeftListProps) {

  return (
    <div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_item} onClick={() => { }}>New</li>
        <li className={s.nav_list_item} onClick={() => { props.setIsSelectFlowsVisible(true) }}>Load</li>
        <li className={s.nav_list_item} onClick={() => { }}>Save</li>
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