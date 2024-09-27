// @flow
import { LoadedFlow } from "store/interfaces/Iflow";
import useStore from "store/store";
import { deleteDraftFlowAPI, getDraftApi } from "api/draft";
import moment from "moment";
import { AxiosResponse } from "axios";
import { FlowStructure } from "store/interfaces/Iflow";
import s from "../DrafFlows.module.scss";

type Props = {
  loadedFlowFolders: any;
  currentDraftFolder: string;
  loadDraftFlowList: () => void;
};
export function DraftFlowsTable({
  loadedFlowFolders,
  currentDraftFolder,
  loadDraftFlowList,
}: Props) {
  const { setTooltipText } = useStore(
    (state) => state.designerVisualElementsSlice
  );

  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const { loadFlowFromDraft, addFlowToTabs, allFlows } = useStore(
    (state) => state.flowSlice
  );

  const {
    toggleConfirmationModal,
    setConfirmationModalActions,
    toggleMessageModal,
  } = useStore((state) => state.modalWindowsSlice);

  const handleLoadDraft = async (flowIdToLoad: string) => {
    try {
      const res: AxiosResponse = await getDraftApi(flowIdToLoad);

      const match = allFlows.find(
        (flow: FlowStructure) =>
          flow.flowIdentifier === res.data.flowConfiguration.flowIdentifier
      );

      if (match) {
        toggleMessageModal("this flow is already opened");
        return;
      }
      loadFlowFromDraft(res.data.flowConfiguration);
      addFlowToTabs(res.data.flowConfiguration);
    } catch (e) {
      console.log("error loading draft");
    } finally {
      modalSlice.toggleUpdateFlowModal(false);
      modalSlice.toggleLoadFlowModal(false);
    }
  };

  async function deleteDraftAndUpdate(draftId: string) {
    try {
      await deleteDraftFlowAPI(draftId);
      await loadDraftFlowList();
    } catch (e) {
      console.log(e);
    }
  }
  return (
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
        {loadedFlowFolders[currentDraftFolder]?.map((flow: LoadedFlow) => (
          <tr key={flow.draftId}>
            <td className={s.flow_name} colSpan={2}>
              {flow.flowName}
            </td>
            <td>{flow.createdBy}</td>
            <td>{moment(flow.createdOn).calendar()}</td>
            <td>{flow.flowVersion}</td>
            <td className={s.actions_wrapper}>
              {/*LOAD */}
              <button
                className={`${s.action_confirm_btn} tooltip-item`}
                onMouseEnter={() =>
                  setTooltipText(
                    "Retrieves a draft flow configuration from the server"
                  )
                }
                onClick={() => handleLoadDraft(flow.draftId)}
              >
                Load
              </button>
              {/*DELETE */}
              <button
                className={s.action_delete_btn}
                onClick={() => {
                  toggleConfirmationModal(
                    true,
                    `Would you like to delete ${flow.flowName}?`
                  );
                  setConfirmationModalActions(() =>
                    deleteDraftAndUpdate(flow.draftId)
                  );
                }}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// TEMPLATE : CREATE TEMPLATE FROM EXISTING LIVE FLOW
// UPDATE: UPDATE EXISTING LIVE FLOW
