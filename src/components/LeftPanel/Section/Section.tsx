import s from "./Section.module.scss";
import NodeListItem from "../NodeListItem/NodeListItem";
import { NodeType, nodeType } from "../../../store/nodeTypes";
import { connectionsIcons } from "../../../icons/icons";
import { Node } from "react-flow-renderer";

type onDragStart = (e: any) => void;
type onDragEnd = (e: any, nodeType: NodeType) => void;

interface SectionProps {
  onDragStart: onDragStart;
  onDragEnd: onDragEnd;
  title: string;
  nodeType: any;
  nodeGroup: any;
}

function Section(props: SectionProps) {
  const filteredData = Object.entries(props.nodeType)
    .filter(([key, val]: Array<any>) => val.data.group === props.nodeGroup)
    .map(([key, val]: Array<any>) => {
      return val;
    });

  return (
    <section>
      <h5>{props.title}</h5>
      <ul className={s.node_list_container}>
        {filteredData.map((x:any)=>
          <li className={s.node_list_item} key={filteredData.indexOf(x)}>
            <NodeListItem
            onDragStart={props.onDragStart}
            onDragEnd={props.onDragEnd}
            nodeType={x}
          />
          </li>
        )}
      </ul>
    </section>
  );
}

export default Section;
