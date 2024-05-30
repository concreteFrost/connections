import { useState} from "react";
import useStore from "../../../../store/store";
import { getDraftListApi } from "../../../../api/draft";
import { connectionsIcons } from "../../../../assets/icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import s from "./ListItem.module.scss";

interface FlowsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function DraftFlowsItem(props: FlowsItemProps) {
  const [draftFlowList, setDraftFlowList] = useState<Array<any>>([]);
  const { loadFlowFromDraft, deleteDraftFlow } = useStore(
    (state) => state.flowSlice
  );

  const [isListLoaded, setListLoaded] = useState<boolean>(false);

  async function fetchDraftFlowList() {
    if (!isListLoaded) {
      try {
        const res: any = await getDraftListApi();
        if (res.data.hasOwnProperty("draftFlows")) {
          const data: any = await res.data.draftFlows;
          sortDraftsByFolder(data);
          setListLoaded(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  const sortDraftsByFolder = (data: any) => {
    const sortedDrafts = Object.keys(data).reduce(
      (previousObject: any, key) => {
        previousObject[key] = data[key];
        previousObject[key].isExpanded = false;
        previousObject[key].forEach((x: any) => {
          x.isDropdownVisible = false;
        });
        return previousObject;
      },
      {}
    );

    setDraftFlowList(sortedDrafts);
  };

  async function performDraftDeletion(flowId: string, folderName: any) {
    try {
      const res: any = await deleteDraftFlow(flowId);
      if (res.data.success) {
        const filtered = draftFlowList[folderName].filter(
          (flow: any) => flow.draftId !== flowId
        );
        draftFlowList[folderName] = filtered;

        if (draftFlowList[folderName].length <= 0) {
          delete draftFlowList[folderName];
        }
        setDraftFlowList(draftFlowList);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function toggleFolderToOpen(folderName: string) {
    const updatedFolders = Object.keys(draftFlowList).reduce(
      (previousObject: any, key: any) => {
        previousObject[key] = draftFlowList[key];
        previousObject[key].isExpanded =
          folderName === key ?? !previousObject[key].isExpanded;
        //close dropdown options if folder name is not eq key
        if (folderName !== key) {
          previousObject[key].forEach((x: any) => {
            x.isDropdownVisible = false;
          });
        
        }
        return previousObject;
      },
      {}
    );

    setDraftFlowList(updatedFolders);
  }

  return (
    <div className={s.section}>
      <div
        className={s.section_header}
        onClick={async () => {
          await fetchDraftFlowList();
          props.toggleSection("drafts");
        }}
      >
        <span className={s.header_icon}>
          {connectionsIcons.serverMenuIcons.flows}
        </span>
        <h5 className={s.section_title}>DRAFTS</h5>
        <span className={s.arrow_icon}>
          {props.currentSection.drafts
            ? connectionsIcons.arrowDown
            : connectionsIcons.arrowUp}
        </span>
      </div>
      {props.currentSection.drafts ?? Object.keys(draftFlowList).length > 0
        ? Object.keys(draftFlowList).map((folderName: any) => (
            <div
              key={folderName}
              className={s.draft_list_item_wrapper}
              onClick={() => toggleFolderToOpen(folderName)}
            >
              <div className={s.folder_name}>
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
                    <li key={flow.draftId} className={s.flow_list_item}>
                      <div className={s.flow_list_title_wrapper}>
                        {flow.flowName}
                      </div>
                      <div className={s.flow_list_btn_wrapper}>
                        <button onClick={() => (flow.isDropdownVisible = true)}>
                          ...
                        </button>
                      </div>
                      {flow.isDropdownVisible ? (
                        <div className={s.flow_list_dropdown_actions}>
                          <button
                            onClick={() => (flow.isDropdownVisible = false)}
                          >
                            CLOSE
                          </button>
                          <button
                            onClick={() => {
                              loadFlowFromDraft(flow.draftId);
                              props.navigate("/designer");
                            }}
                          >
                            LOAD
                          </button>
                          <button className={s.delete_btn}
                            onClick={() =>
                              performDraftDeletion(flow.draftId, folderName)
                            }
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
