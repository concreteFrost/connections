import View from "./View/View";
import s from "./CentralPanel.module.scss";
import Create from "./Create";
import Save from "./Save";
import Load from "./Load";
import Close from "./Close";
import Approve from "./Approve";
import SwitchToServerView from "./SwitchToServerView";
import useStore from "store/store";
import { useRef, useState } from "react";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";
import useOutsideMouseClick from "hooks/useOutsideMouseClick";

function CentralPanel() {

  const flowId = useStore((state) => state.flowSlice.flow.flowIdentifier);
  const [isViewSectionVisible,setViewSectionVisible] = useState<boolean>(false);
  const viewRef:any = useRef();
  const {flowName} = useStore((state)=>state.flowSlice.flow);

  useEscapeKeyHandler(()=> setViewSectionVisible(false))
  useOutsideMouseClick(viewRef,()=>setViewSectionVisible(false))
  
  return (
    <div className={s.wrapper}>
      <ul className={s.nav_list}>
     
        <SwitchToServerView ></SwitchToServerView>
        <div className={s.flow_name}> {flowName}</div>
       
        <Create ></Create>
        {flowId ? <Save></Save> : null} 
        <Load></Load>
        {flowId ? <Close></Close> : null}
        {/*VIEW */}
        <li className={s.nav_list_item} ref={viewRef}>
        <div onClick={()=>setViewSectionVisible(!isViewSectionVisible)}>View</div>
         {isViewSectionVisible ? <View /> : null}
        </li>
        <li className={s.nav_list_item}>
          <Approve></Approve>
          </li>
      </ul>
    </div>
  );
}


export default CentralPanel;

