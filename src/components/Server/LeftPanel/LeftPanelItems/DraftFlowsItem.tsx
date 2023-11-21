import { useState, useEffect } from "react";
import useStore from "../../../../store/store";
import { getDraftListApi } from "../../../../api/draft";
import { connectionsIcons } from "../../../../icons/icons";

interface FlowsItemProps {
  className: any;
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  isSectionOpened: any;
}

interface DraftFlowData {
  approved: boolean;
  approvedBy: string;
  basedOnLiveVersion: string;
  createdBy: string;
  createdOn: string;
  draftId: string;
  flowFileName: string;
  flowName: string;
  flowVersion: string;
  subFolder: string;
  updatedBy: string;
  updatedOn: string;
}

interface IFolderStructure {
  folderName: string;
  isExpanded: boolean;
}

function DraftFlowsItem(props: FlowsItemProps) {
  const [draftFlowList, setDraftFlowList] = useState<Array<any>>([]);
  const loadDraftFlow = useStore((state) => state.flowSlice.loadFlowFromDraft);

  useEffect(() => {
    getDraftListApi()
      .then((res: any) => {
        const data = res.data.draftFlows;
        const updatedObject = Object.keys(data).reduce((result: any, key) => {
          result[key] = data[key];
          result[key].isExpanded = false;
          return result;
        }, {});
        setDraftFlowList(updatedObject);
      })
      .catch((e) => console.log(e));
  }, []);

  function toggleFolderToOpen(folderName: string) {
    const updatedObject = Object.keys(draftFlowList).reduce(
      (result: any, key: any) => {
        result[key] = draftFlowList[key];
        result[key].isExpanded =
          folderName === key ?? !draftFlowList[key].isExpanded;
        return result;
      },
      {}
    );
    setDraftFlowList(updatedObject);
  }

  return (
    <div className={props.className.section}>
      <div className={props.className.section_header}>
        <span className={props.className.header_icon}>
          {connectionsIcons.serverMenuIcons.flows}
        </span>
        <h5 className={props.className.section_title}>DRAFTS</h5>
        <span
          className={props.className.arrow_icon}
          onClick={() => props.toggleSection("drafts")}
        >
          {props.isSectionOpened.drafts
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.isSectionOpened.drafts ?? Object.keys(draftFlowList).length > 0
        ? Object.keys(draftFlowList).map((folderName: any) => (
            <div
              key={folderName}
              className={props.className.draft_list_item_wrapper}
            >
              <div
                className={props.className.folder_name}
                onClick={() => toggleFolderToOpen(folderName)}
              >
                <header>{folderName}</header>
                <span>
                  {draftFlowList[folderName].isExpanded
                    ? connectionsIcons.arrowDown
                    : connectionsIcons.arrowUp}
                </span>
              </div>
              {draftFlowList[folderName].isExpanded ? (
                <ul>
                  {draftFlowList[folderName].map((flow: DraftFlowData) => (
                    <li key={flow.draftId} className={props.className.flow_list}> 
                      <div>
                        {flow.flowName}
                      </div>
                      <div className={props.className.flow_list_btn_wrapper}>
                        <button
                          onClick={() => {
                            loadDraftFlow(flow.draftId);
                            props.navigate("/designer");
                          }}
                        >
                          EDIT
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}

export default DraftFlowsItem;

// <ul>
// {draftFlowList.length > 0
//     ? draftFlowList.map((flow: any) => (
//         <li key={flow.flowId} className={`${props.className.flow_list}  ${currentFlow.flowIdentifier === flow.flowId ? props.className['selected'] : null}`}>
//             <div
//                 onClick={async () => {
//                     await getCurrentFlow(flow.flowId)
//                     props.navigate("flows")
//                 }}>
//                 {flow.name}
//             </div>
//             <div className={props.className.flow_list_btn_wrapper}>
//                 <button onClick={() => {
//                     loadDraftFlow(flow.flowId);
//                     props.navigate('/designer')
//                 }}>EDIT</button>
//             </div>
//         </li>
//     ))
//     : null}
// </ul>
