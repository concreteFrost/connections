import { useState, useEffect, useRef } from "react";
import useStore from "../../../../store/store";
import { getDraftListApi } from "../../../../api/draft";
import { connectionsIcons } from "../../../../icons/icons";
import { ILeftPanelSections } from "../LeftPanel";

interface FlowsItemProps {
  className: any;
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
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
  const { loadFlowFromDraft, deleteDraftFlow } = useStore(
    (state) => state.flowSlice
  );
  const { toggleApproveFlowModal, setApproveFlowModalMessage } = useStore(
    (state) => state.modalWindowsSlice
  );

  async function fetchDraftFlowList() {
    getDraftListApi()
      .then((res: any) => {
        const data = res.data.draftFlows;
        const updatedObject = Object.keys(data).reduce((result: any, key) => {
          result[key] = data[key];
          result[key].isExpanded = false;
          result[key].forEach((draft: any) => {
            draft.isDropdownVisible = false;
          });
          return result;
        }, {});

        setDraftFlowList(updatedObject);
      })
      .catch((e) => console.log(e));
  }

  async function performDraftDeletion(flowId: string) {
    try {
      await deleteDraftFlow(flowId);
      await fetchDraftFlowList();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchDraftFlowList();
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
      <div
        className={props.className.section_header}
        onClick={() => props.toggleSection("drafts")}
      >
        <span className={props.className.header_icon}>
          {connectionsIcons.serverMenuIcons.flows}
        </span>
        <h5 className={props.className.section_title}>DRAFTS</h5>
        <span className={props.className.arrow_icon}>
          {props.currentSection.drafts
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.currentSection.drafts ?? Object.keys(draftFlowList).length > 0
        ? Object.keys(draftFlowList).map((folderName: any) => (
            <div
              key={folderName}
              className={props.className.draft_list_item_wrapper}
              onClick={() => toggleFolderToOpen(folderName)}
            >
              <div className={props.className.folder_name}>
                <header>{folderName}</header>
                <span>
                  {draftFlowList[folderName].isExpanded
                    ? connectionsIcons.arrowDown
                    : connectionsIcons.arrowUp}
                </span>
              </div>
              {draftFlowList[folderName].isExpanded ? (
                <ul>
                  {draftFlowList[folderName].map((flow: any) => (
                    <li
                      key={flow.draftId}
                      className={props.className.flow_list_item}
                    >
                      <div className={props.className.flow_list_title_wrapper}>
                        {flow.flowName}
                      </div>
                      <div className={props.className.flow_list_btn_wrapper}>
                        <button onClick={() => (flow.isDropdownVisible = true)}>
                          ...
                        </button>
                      </div>
                      {flow.isDropdownVisible ? (
                        <div
                          className={props.className.flow_list_dropdown_actions}
                        >
                          <button
                            onClick={() => (flow.isDropdownVisible = false)}
                          >
                            x
                          </button>
                          <button
                            onClick={() => {
                              loadFlowFromDraft(flow.draftId);
                              props.navigate("/designer");
                            }}
                          >
                            LOAD
                          </button>
                          <button
                            onClick={() => {
                              setApproveFlowModalMessage(flow.flowName);
                              toggleApproveFlowModal(true, flow.draftId);
                            }}
                          >
                            APPROVE
                          </button>
                          <button
                            onClick={() => performDraftDeletion(flow.draftId)}
                          >
                            DELETE
                          </button>
                        </div>
                      ) : null}
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
