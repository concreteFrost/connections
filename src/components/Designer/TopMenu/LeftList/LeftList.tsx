import View from "./View/View";
import s from "./LeftList.module.scss";
import useStore from "../../../../store/store";
import FlowsList from "./FlowsList/FlowsList";
import { getFlowListApi } from "../../../../api/flow";
import { useState } from "react";

function LeftList(props: any) {
  const saveFlow = useStore((state) => state.saveFlow);

  const [loadedFlows, setLoadedFlows] = useState<Array<object>>([])
  const [isSelectFlowVisible, setIsSelectFlowVisible] = useState<boolean>(false);
  function getFlowList() {
    setIsSelectFlowVisible(!isSelectFlowVisible);
    getFlowListApi().then((res: any) => {
      setLoadedFlows(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  function closeSelectFlowModal() {
    setIsSelectFlowVisible(false);
  }

  return (
    <div>
      <ul className={s.nav_list}>
        <li className={s.nav_list_item}>New</li>
        {/* <li className={s.nav_list_item} onClick={openTestFlow}>Open</li> */}
        <li className={s.nav_list_item} onClick={getFlowList}>Load</li>
        <li className={s.nav_list_item} onClick={saveFlow}>Save</li>
        <li className={s.nav_list_item} onClick={() => props.toggleDropdown("exportFlow")}>Export</li>
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
        <li className={s.nav_list_item}>Print</li>
      </ul>
      {isSelectFlowVisible ? <FlowsList loadedFlows={loadedFlows} closeSelecFlowModal={closeSelectFlowModal}></FlowsList> : null}
    </div>
  );
}

export default LeftList;
