import { connectionsIcons } from "../../../../assets/icons/icons";
import { useEffect, useState } from "react";
import useStore from "../../../../store/store";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss";
import { Link } from "react-router-dom";
import { FlowStatus } from "../../../../store/interfaces/IStatistics";
import { useParams } from "react-router-dom";

interface FlowsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function FlowsItem(props: FlowsItemProps) {
  const [flowList, setFlowList] = useState<Array<FlowStatus>>([]);
  const createUpdateDraftFromLiveTemplate = useStore(
    (state) => state.flowSlice.createUpdateDraftFromLiveTemplate
  );
  const { statistics } = useStore((state) => state.statisticsSlice);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (statistics) setFlowList(statistics);
  }, [statistics]);

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
      {props.currentSection.flows && (
        <ul>
          {flowList.length > 0
            ? flowList.map((flow: any) => (
                <li key={flow.flowId} className={s.flow_list_item}>
                  <Link 
                    to={`flows/${flow.flowId}`}
                    // className={`${s.flow_list_item}  ${currentFlow.flowIdentifier === flow.flowId
                    //     ? s["selected"]
                    //     : null
                    //   }`}
                  >
                    <div className={s.flow_list_title_wrapper}>{flow.name}</div>
                  </Link>
                  <div className={s.flow_list_btn_wrapper}>
                    <button
                      onClick={() => {
                        createUpdateDraftFromLiveTemplate(flow.flowId);
                        props.navigate("/designer");
                      }}
                    >
                      EDIT
                    </button>
                  </div>
                </li>
              ))
            : null}
        </ul>
      )}
    </div>
  );
}

export default FlowsItem;
