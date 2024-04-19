import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { useEffect } from "react";
import { getDraftListApi } from "../../api/draft";
import { checkExistingFlowInDataBase } from "../../store/actions/utils/flowUtils";
import useEscapeKeyHandler from "../../hooks/useEscapeKeyHandler";
import { toggleApproveFlowModal } from "../../store/actions/modalActions";

export enum UpdateFlowActions {
  Create,
  SaveDraft,
  LoadDraft,
  LoadLive,
  Quit,
  Close,
}

interface IDraftFlow {
  draftId: string;
  subfolder: string;
  flowName: string;
}

function UpdateFlowModal() {
  const flowSlice = useStore((state) => state.flowSlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const subfolderName = useStore(
    (state) => state.modalWindowsSlice.updateFlowModal.subfolderName
  );
  const setSubfolderName = useStore(
    (state) => state.modalWindowsSlice.setUpdateFlowSubfolderName
  );
  const actions = useStore(
    (state) => state.modalWindowsSlice.updateFlowModal.actions
  );

  //sets subfolder name value if match
  async function compareSubfolderName() {
    await getDraftListApi().then((res: any) => {
      const data = res.data.draftFlows;
      const mergedFolders: any = Object.values(data).reduce(
        (result: any, currentArray) => result.concat(currentArray),
        []
      );
      const matchSubfolderName = mergedFolders.find(
        (flow: any) => flow.flowName === flowSlice.flow.flowName
      )?.subFolder;
      setSubfolderName(matchSubfolderName ? matchSubfolderName : "drafts");
    });
  }

  async function tryToSaveFlow() {
    try {
      const match = await checkExistingFlowInDataBase(flowSlice.flow.flowName);
      const saveDraftFlow = await flowSlice.saveDraftFlow(
        match,
        modalSlice.updateFlowModal.subfolderName
      );
      await modalSlice.toggleUpdateFlowModal(false);
      await modalSlice.toggleLoadFlowModal(false);

      if (saveDraftFlow) {
        await actions.save();
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    compareSubfolderName();
  }, [modalSlice.updateFlowModal.isVisible]);

  function cancelSaving() {
    modalSlice.toggleUpdateFlowModal(false);
  }

  return (
    <>
      {modalSlice.updateFlowModal.isVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>Save current flow</header>
            <main className={s.modal_body}>
              Would you like to save changes in{" "}
              <span>{flowSlice.flow.flowName}</span> ?
            </main>
            <footer className={s.modal_footer}>
              <div className={s.input_wrapper}>
                <label>Subfolder Name: </label>
                <input
                  type="text"
                  value={subfolderName}
                  onChange={(e: any) => setSubfolderName(e.target.value)}
                />
              </div>
              <div className={s.buttons_wrapper}>
                <button onClick={tryToSaveFlow}>YES</button>
                <button onClick={actions.discard}>NO</button>
                <button onClick={cancelSaving}>CANCEL</button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UpdateFlowModal;
