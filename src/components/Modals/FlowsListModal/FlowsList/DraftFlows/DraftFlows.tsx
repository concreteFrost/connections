import useStore from "store/store";
import { deleteDraftFlowAPI, getDraftListApi } from "api/draft";
import s from "./DrafFlows.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";
import { connectionsIcons } from "assets/icons/icons";
import { LoadedFlow } from "store/interfaces/Iflow";

interface ISectionToOpen {
  folders: boolean;
  flows: boolean;
}

function DraftFlows() {

  const [loadedFlowFolders, setLoadedFlowFolders] = useState<any>([]);
  const [currentDraftFolder, setCurrentDraftFolder] = useState<string>("");
  const [draftSectionToOpen, setDraftSectionToOpen] = useState<ISectionToOpen>({
    folders: true,
    flows: false,
  });
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);
  const setTooltipText = useStore((state) => state.designerVisualElementsSlice.setTooltipText);
  const {toggleConfirmationModal,setConfirmationModalActions} = useStore((state)=>state.modalWindowsSlice);

  function loadDraftFlowList() {
    getDraftListApi()
      .then((res: any) => {
        setLoadedFlowFolders(res.data.draftFlows);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    loadDraftFlowList();
  }, []);

  const saveAndLoadDraft = (flowIdToLoad: string) => {
    flowSlice.loadFlowFromDraft(flowIdToLoad);
    modalSlice.toggleUpdateFlowModal(false)
    modalSlice.toggleLoadFlowModal(false)
  };

  const loadDraftWithoutSaving = async (flowIdToLoad: string) => {
    flowSlice.loadFlowFromDraft(flowIdToLoad);
    modalSlice.toggleUpdateFlowModal(false)
    modalSlice.toggleLoadFlowModal(false)
  };

  async function deleteDraftAndUpdate(draftId: string) {
    try {
      await deleteDraftFlowAPI(draftId);
      await loadDraftFlowList();
    }
    catch (e) {
      console.log(e)
    }
  }

  if(loadedFlowFolders.length<=0) return null;

  return (
    <div className={s.wrapper}>
      {/*FOLDERS */}
      <header>Drafts</header>
      <ul>
        {Object.entries(loadedFlowFolders).length > 0 &&
          draftSectionToOpen.folders === true
          ? Object.entries(loadedFlowFolders).map(([key, val]) => (
            <li
              key={key}
              onClick={() => {
                setDraftSectionToOpen({ folders: false, flows: true });
                setCurrentDraftFolder(key);
              }}
            >
              <span>{connectionsIcons.folder}</span> {key}
            </li>
          )) : null }
        
      </ul>
      {/*FLOWS TABLE */}
      <div className={s.table_wrapper}>
        {draftSectionToOpen.flows === true ? (
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Name</th>
                <th>Author</th>
                <th>Created</th>
                <th>Version</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadedFlowFolders[currentDraftFolder]?.map(
                (flow: LoadedFlow) => (
                  <tr key={flow.draftId}>
                    <td
                      className={s.flow_name}
                      colSpan={2}
                    >
                      {flow.flowName}
                    </td>
                    <td>{flow.createdBy}</td>
                    <td>{moment(flow.createdOn).calendar()}</td>
                    <td>{flow.flowVersion}</td>
                    <td className={s.actions_wrapper}>
                      {/*LOAD */}
                      <button className={`${s.action_confirm_btn} tooltip-item`}
                        onMouseEnter={() => setTooltipText('Retrieves a draft flow configuration from the server')}
                        onClick={() => {
                          setTooltipText("")
                          if (flowSlice.flow.flowIdentifier) {
                            modalSlice.toggleUpdateFlowModal(true)
                            modalSlice.setUpdateFlowModalActions({ save: () => saveAndLoadDraft(flow.draftId), discard: () => loadDraftWithoutSaving(flow.draftId) })
                          }
                          else {
                            flowSlice.loadFlowFromDraft(flow.draftId);
                            modalSlice.toggleLoadFlowModal(false)
                          }
                        }}
                      >Load</button>
                      {/*DELETE */}
                      <button className={s.action_delete_btn}   onClick={() => {
                            toggleConfirmationModal(
                              true,
                              `Would you like to delete ${flow.flowName}?`
                            );
                            setConfirmationModalActions(() =>
                              deleteDraftAndUpdate(flow.draftId)
                            );
                          }}>X</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}
      </div>
      {/*BACK BTN */}
      {draftSectionToOpen.flows == true ? <button
        className={s.footer_btn}
        onClick={() => setDraftSectionToOpen({ folders: true, flows: false })}
      >
        Back
      </button> : null}

    </div>
  );
}

// TEMPLATE : CREATE TEMPLATE FROM EXISTING LIVE FLOW
// UPDATE: UPDATE EXISTING LIVE FLOW


export default DraftFlows;
