// @flow
import { LoadedFlow } from "store/interfaces/Iflow";
import useStore from "store/store";
import { deleteDraftFlowAPI } from "api/draft";
import moment from "moment";
import s from "../DrafFlows.module.scss";
import { useLoadDraft } from "utils/drafts/useLoadDraft";

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

  const { toggleConfirmationModal, setConfirmationModalActions } = useStore(
    (state) => state.modalWindowsSlice
  );

  const { handleLoadDraft } = useLoadDraft();
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
