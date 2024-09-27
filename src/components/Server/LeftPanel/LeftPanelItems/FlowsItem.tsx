import { connectionsIcons } from "assets/icons/icons";
import { useEffect, useState } from "react";
import useStore from "store/store";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss";
import { Link } from "react-router-dom";
import { FlowStatus } from "store/interfaces/IStatistics";
import { useParams } from "react-router-dom";

interface FlowsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function FlowsItem(props: FlowsItemProps) {
  const [flowList, setFlowList] = useState<Array<FlowStatus>>([]);
  const { statistics } = useStore((state) => state.statisticsSlice);
  const { "*": path } = useParams();

  useEffect(() => {
    if (statistics) setFlowList(statistics);
  }, [statistics]);

  if (flowList.length <= 0) return null; //avoid rendering if list is empty

  return (
    <div className={s.section}>
      <div
        className={s.section_header}
        onClick={() => props.toggleSection("flows")}
      >
        <span className={s.header_icon}>
          {connectionsIcons.serverMenuIcons.flows}
        </span>
        <h5 className={s.section_title}>FLOWS</h5>
        <span className={s.arrow_icon}>
          {props.currentSection.flows
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.currentSection.flows ? (
        <ul>
          {flowList.map((flow: FlowStatus) => (
            <li
              key={flow.flowId}
              className={`${s.flow_list_item}  ${
                path?.split("/")[1] === flow.flowId ? s["selected"] : null
              }`}
            >
              <Link to={`flows/${flow.flowId}`}>
                <div className={s.flow_list_title_wrapper}>{flow.name}</div>
              </Link>
              <div className={s.flow_list_btn_wrapper}>
                {/* <button 
                  data-testid="flow-list-btn"
                  onClick={() => {
                    createFlowFromTemplate(flow.flowId, flow.name + " copy")
                    props.navigate("/dashboard/designer");
                  }}
                >
                  {connectionsIcons.upload}
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default FlowsItem;
