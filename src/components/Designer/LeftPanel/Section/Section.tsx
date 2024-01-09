import s from "./Section.module.scss";
import NodeListItem from "../NodeListItem/NodeListItem";
import { INodeType } from "../../../../store/interfaces/INode";
import { connectionsIcons } from "../../../../icons/icons";
import { useState } from "react";

interface SectionProps {
  onDragEnd: (e: any, nodeType: INodeType) => void;
  title: string;
  nodeType: INodeType[];
  nodeGroup: string;
}

function Section(props: SectionProps) {
  //returns filtered blocks that has matched type provided in props
  const filteredData = Object.entries(props.nodeType)
    .filter(
      ([key, val]: [string, INodeType]) => val.data.baseTypeName === props.nodeGroup
    )
    .map(([key, val]:[string,INodeType]) => {
      return val;
    });

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
          ? filteredData.map((x: INodeType) => (
              <li className={s.node_list_item} key={filteredData.indexOf(x)}>
                <NodeListItem onDragEnd={props.onDragEnd} nodeType={x} />
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}

export default Section;
