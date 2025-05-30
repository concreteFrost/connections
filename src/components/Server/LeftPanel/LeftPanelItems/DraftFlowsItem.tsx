import { useState } from "react";
import { deleteDraftFlowAPI, getDraftListApi } from "api/draft";
import { connectionsIcons } from "assets/icons/icons";
import { ILeftPanelSections } from "../LeftPanel";
import { LoadedFlow } from "store/interfaces/Iflow";
import { useLoadDraft } from "utils/drafts/useLoadDraft";
import s from "./ListItem.module.scss";
import { useNavigate } from "react-router";

interface FlowsItemProps {
  toggleSection: (section: string) => void;
  navigate: (route: string) => void;
  currentSection: ILeftPanelSections;
}

function DraftFlowsItem(props: FlowsItemProps) {
  const [draftFlowList, setDraftFlowList] = useState<Array<any>>([]);
  const [isListLoaded, setListLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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
      const res: any = await deleteDraftFlowAPI(flowId);
      if (res.data.success) {
        const filtered = draftFlowList[folderName].filter(
          (flow: any) => flow.draftId !== flowId
        );
        draftFlowList[folderName] = filtered;

        if (draftFlowList[folderName].length <= 0) {
          delete draftFlowList[folderName];
        }
        setDraftFlowList(draftFlowList);
        toggleFolderToOpen(folderName);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function toggleFolderToOpen(folderName: any) {
    setDraftFlowList((prev) => {
      const updated = { ...prev };
      updated[folderName].isExpanded = !updated[folderName].isExpanded;
      return updated;
    });
  }

  const { handleLoadDraft } = useLoadDraft();

  const foo = async (flow: string) => {
    try {
      const res = await handleLoadDraft(flow);
      if (res === true) {
        navigate("/dashboard/designer");
      }

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.section}>
      <div
        className={s.section_header}
        data-testid="draft-flow-header"
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
            <div key={folderName} className={s.draft_list_item_wrapper}>
              <div
                data-testid={`test_${folderName}`}
                className={s.folder_name}
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
                  {draftFlowList[folderName].map((flow: LoadedFlow) => (
                    <li key={flow.draftId} className={s.flow_list_item}>
                      <span className={s.flow_name}>{flow.flowName}</span>
                      <div className={s.flow_list_btn_wrapper}></div>

                      <div className={s.flow_list_dropdown_actions}>
                        <button onClick={() => foo(flow.draftId)}>
                          {connectionsIcons.upload}
                        </button>
                        <button
                          className={s.delete_btn}
                          onClick={() =>
                            performDraftDeletion(flow.draftId, folderName)
                          }
                        >
                          X
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
