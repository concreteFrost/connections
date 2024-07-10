import s from "./LeftPanel.module.scss";
import useStore from "store/store";
import { useRef, useState } from "react";
import Section from "./Section/Section";
import { nodeGroup } from "store/constants/nodeConst";
import { connectionsIcons } from "../../../assets/icons/icons";

function LeftPanel() {
  const flowIdentifier = useStore(
    (state) => state.flowSlice.flow.flowIdentifier
  );
  const leftPanelRef = useRef<HTMLDivElement>(null); //used to identify the borders of the left panel element
  const [isPanelActive, setIsPanelActive] = useState(true);
  
  const wrapperClasses = `${s.wrapper} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;
  const toggleBtnClasses = `${s.toggle_btn} ${
    isPanelActive ? s["opened"] : s["closed"]
  }`;

  return (
    <div className={wrapperClasses} ref={leftPanelRef} data-testid="designer_left_panel_wrapper">
      <div className={toggleBtnClasses}>
        <button data-testid="close_designer_left_panel_btn" onClick={()=>setIsPanelActive(!isPanelActive)}>
          {isPanelActive
            ? connectionsIcons.leftCaret
            : connectionsIcons.rightCaret}
        </button>
      </div>
      <div className={s.add_node_container}>
        <div className={s.header}>CREATE BLOCKS</div>
        {flowIdentifier ? (
          <div className={s.node_list_wrapper}>
            <div className={s.node_list}>
              <Section
                title="DATA STORE"
                leftPanelRef={leftPanelRef}
                nodeGroup={nodeGroup.dataGroup}
              />
              <Section
                title="EXTERNAL"
                leftPanelRef={leftPanelRef}
                nodeGroup={nodeGroup.externalGroup}
              />
              <Section
                title="FUNCTION"
                leftPanelRef={leftPanelRef}
                nodeGroup={nodeGroup.functionGroup}
              />
              <Section
                title="INPUT"
                leftPanelRef={leftPanelRef}
                nodeGroup={nodeGroup.inputGroup}
              />
              <Section
                title="OUTPUT"
                leftPanelRef={leftPanelRef}
                nodeGroup={nodeGroup.outputGroup}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LeftPanel;
