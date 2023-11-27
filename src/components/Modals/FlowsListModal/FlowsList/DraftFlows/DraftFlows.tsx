import useStore from "../../../../../store/store";
import { getDraftListApi } from "../../../../../api/draft";
import s from "./DrafFlows.module.scss";
import { useState, useEffect } from "react";
import moment from "moment";
import { connectionsIcons } from "../../../../../icons/icons";
import ApproveModal from "../../../ApproveModal";

interface ILoadedFlow {
  flowId: string;
  draftId: string;
  flowName: string;
  createdBy: string;
  createdOn: string;
}

interface ISectionToOpen {
  folders: boolean;
  flows: boolean;
}

function DraftFlows() {

  const deleteDraftFlow = useStore((state) => state.flowSlice.deleteDraftFlow);
  const [loadedFlowFolders, setLoadedFlowFolders] = useState<any>([]);
  const [currentDraftFolder, setCurrentDraftFolder] = useState<string>("");
  const [draftSectionToOpen, setDraftSectionToOpen] = useState<ISectionToOpen>({
    folders: true,
    flows: false,
  });
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const flowSlice = useStore((state) => state.flowSlice);

  const { setApproveFlowModalMessage, toggleApproveFlowModal } = useStore((state) => state.modalWindowsSlice);

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
      await deleteDraftFlow(draftId);
      await loadDraftFlowList();
    }
    catch (e) {
      console.log(e)
    }
  }
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
          ))
          : null}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loadedFlowFolders[currentDraftFolder]?.map(
                (flow: ILoadedFlow) => (
                  <tr key={flow.draftId}>
                    <td
                      className={s.flow_name}

                      colSpan={2}
                    >
                      {flow.flowName}
                    </td>
                    <td>{flow.createdBy}</td>
                    <td>{moment(flow.createdOn).calendar()}</td>

                    <td className={s.actions_wrapper}>
                      {/*LOAD */}
                      <button className={s.action_confirm_btn}
                        onClick={() => {
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
                      {/*APPROVE */}
                      <button className={s.action_confirm_btn}
                        onClick={() => {
                          toggleApproveFlowModal(true, flow.draftId);
                          setApproveFlowModalMessage(flow.flowName)
                        }}
                      >Approve</button>
                      {/*DELETE */}
                      <button className={s.action_delete_btn} onClick={() => {
                        deleteDraftAndUpdate(flow.draftId)
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
      <ApproveModal></ApproveModal>
    </div>
  );
}

// TEMPLATE : CREATE TEMPLATE FROM EXISTING LIVE FLOW
// UPDATE: UPDATE EXISTING LIVE FLOW


export default DraftFlows;
