import { connectionsIcons } from "../../../../icons/icons";
import { useEffect, useState } from "react";
import useStore from "../../../../store/store";
import { getFlowListApi } from "../../../../api/flow";

interface FlowsItemProps {
  className: any;
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  isSectionOpened: any;
}

function FlowsItem(props: FlowsItemProps) {
  const [flowList, setFlowList] = useState([]);
  const getCurrentFlow = useStore((state) => state.serverSlice.getCurrentFlow);
  const currentFlow = useStore<any>((state) => state.serverSlice.currentFlow);
  const createUpdateDraftFromLiveTemplate = useStore((state) => state.flowSlice.createUpdateDraftFromLiveTemplate);

  useEffect(() => {
    getFlowListApi()
      .then((res: any) => {
        setFlowList(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={props.className.section}>
      <div className={props.className.section_header}>
        <span className={props.className.header_icon}>
          {connectionsIcons.serverMenuIcons.flows}
        </span>
        <h5 className={props.className.section_title}>FLOWS</h5>
        <span
          className={props.className.arrow_icon}
          onClick={() => props.toggleSection("flows")}
        >
          {props.isSectionOpened.flows
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.isSectionOpened.flows && (
        <ul>
          {flowList.length > 0
            ? flowList.map((flow: any) => (
              <li
                key={flow.flowId}
                className={`${props.className.flow_list_item}  ${currentFlow.flowIdentifier === flow.flowId
                    ? props.className["selected"]
                    : null
                  }`}
              >
                <div
                  onClick={async () => {
                    await getCurrentFlow(flow.flowId);
                    props.navigate("flows");
                  }}
                >
                  {flow.name}
                </div>
                <div className={props.className.flow_list_btn_wrapper}>
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
