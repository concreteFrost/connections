import s from "./Section.module.scss";
import NodeListItem from "../NodeListItem/NodeListItem";
import { NodeType } from "store/interfaces/INode";
import { connectionsIcons } from "../../../../assets/icons/icons";
import { useState } from "react";
import useStore from "store/store";

interface SectionProps {
  title: string;
  nodeGroup: string;
  leftPanelRef: any;
}

function Section(props: SectionProps) {
  //returns filtered blocks that has matched type provided in props
  const blockList = useStore((state) => state.flowSlice.blockList);
  const filteredData = Object.entries(blockList)
    .filter(
      ([key, val]: [string, NodeType]) =>
        val.data.baseTypeName === props.nodeGroup
    )
    .map(([key, val]: [string, NodeType]) => {
      return val;
    })
    .sort((a, b) => a.data.name.localeCompare(b.data.name));

  const [isSectionOpened, setIsSectionOpened] = useState(true);

  const sectionContainerClasses = `${s.node_list_container} ${
    isSectionOpened ? s.opened : s.closed
  }`;

  return (
    <section>
      <div className={s.section_header}>
        <h5>{props.title}</h5>
        <span onClick={() => setIsSectionOpened(!isSectionOpened)}>
          {isSectionOpened
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>

      <ul className={sectionContainerClasses}>
        {filteredData.length > 0
          ? filteredData.map((x: NodeType) => (
              <li className={s.node_list_item} key={filteredData.indexOf(x)}>
                <NodeListItem leftPanelRef={props.leftPanelRef} nodeType={x} />
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}

export default Section;
