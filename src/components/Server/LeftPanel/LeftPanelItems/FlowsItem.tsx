import { connectionsIcons } from "../../../../icons/icons";
import { useEffect, useState } from "react";
import useStore from "../../../../store/store";
import { getFlowListApi } from "../../../../api/flow";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss"

interface FlowsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function FlowsItem(props: FlowsItemProps) {
  const [flowList, setFlowList] = useState([]);
  const getCurrentFlow = useStore((state) => state.serverSlice.getCurrentFlow);
  const currentFlow = useStore<any>((state) => state.serverSlice.currentFlow);
  const createUpdateDraftFromLiveTemplate = useStore(
    (state) => state.flowSlice.createUpdateDraftFromLiveTemplate
  );

  useEffect(() => {
    getFlowListApi()
      .then((res: any) => {
        setFlowList(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

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
                <li
                  key={flow.flowId}
                  className={`${s.flow_list_item}  ${
                    currentFlow.flowIdentifier === flow.flowId
                      ? s["selected"]
                      : null
                  }`}
                >
                  <div className={s.flow_list_title_wrapper}
                    onClick={async () => {
                      await getCurrentFlow(flow.flowId);
                      props.navigate("flows");
                    }}
                  >
                    {flow.name}
                  </div>
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
