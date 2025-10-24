import React, { RefObject } from "react";
import Section from "./Section/Section";
import { nodeGroup } from "shared/constants/nodeConst";
import s from "../LeftPanel.module.scss";
import SearchBlock from "./SearchBlockInput/SearchBlockInput";

interface CreateBlocksWrapperProps {
  flowIdentifier: string;
  leftPanelRef: RefObject<HTMLDivElement>;
}
export default function CreateBlocksWrapper({
  flowIdentifier,
  leftPanelRef,
}: CreateBlocksWrapperProps) {
  return (
    <div className={s.add_node_container}>
      <div className={s.header}>CREATE BLOCKS</div>

      {flowIdentifier ? (
        <>
          <SearchBlock leftPanelRef={leftPanelRef}></SearchBlock>
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
        </>
      ) : null}
    </div>
  );
}
