import s from "./Section.module.scss";
import NodeListItem from "../NodeListItem/NodeListItem";
import { INodeType } from "../../../../store/interfaces/INode";
import { connectionsIcons } from "../../../../icons/icons";
import { useState } from "react";


type onDragStart = (e: any) => void;
type onDragEnd = (e: any, nodeType: INodeType) => void;

interface SectionProps {
  onDragStart: onDragStart;
  onDragEnd: onDragEnd;
  title: string;
  nodeType: any;
  nodeGroup: any;
}

function Section(props: SectionProps) {
  const filteredData = Object.entries(props.nodeType)
    .filter(([key, val]: Array<any>) => val.data.baseTypeName === props.nodeGroup)
    .map(([key, val]: Array<any>) => {
      return val;
    });

  const [isSectionOpened, setIsSectionOpened] = useState(true);

  const sectionContainerClasses = `${s.node_list_container} ${isSectionOpened ? s.opened : s.closed}`

  function toggleSection() {
    setIsSectionOpened(!isSectionOpened);

  }

  return (
    <section>
      <div className={s.section_header}>
        <h5>{props.title}</h5>
        <span onClick={toggleSection}>{isSectionOpened ? connectionsIcons.arrowDown : connectionsIcons.arrowUp}</span>
      </div>

      <ul className={sectionContainerClasses}>
        {filteredData.length > 0 ? filteredData.map((x: any) =>
          <li className={s.node_list_item} key={filteredData.indexOf(x)}>
            <NodeListItem
              onDragStart={props.onDragStart}
              onDragEnd={props.onDragEnd}
              nodeType={x}
            />
          </li>
        ) : null}
      </ul>
    </section>
  );
}

export default Section;
