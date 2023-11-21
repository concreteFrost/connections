import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { checkExistingFlowInDataBase } from "../../store/actions/utils/flowUtils";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getDraftListApi } from "../../api/draft";

export enum UpdateFlowActions {
  Create,
  SaveDraft,
  LoadDraft,
  LoadLive,
  Quit,
}

export interface UpdateFlowProps {
  actions: UpdateFlowActions;
  flowIdToLoad: string;
}

interface IDraftFlow {
  draftId: string;
  subfolder: string;
  flowName: string;
}

function UpdateFlowModal(props: UpdateFlowProps) {
  const flowSlice = useStore((state) => state.flowSlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);
  const navigate = useNavigate();
  const [subfolderName, setSubfolderName] = useState<string>("");

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
      setSubfolderName(matchSubfolderName ? matchSubfolderName : "");
    });
  }

  useEffect(() => {
    compareSubfolderName();
  }, [modalSlice.updateFlowModal.isVisible]);

  async function tryToSaveFlow() {
    try {
      const match = await checkExistingFlowInDataBase(flowSlice.flow.flowName);
      const saveDraftFlow = await flowSlice.saveDraftFlow(match, subfolderName);
      await modalSlice.toggleUpdateFlowModal(false);

      return saveDraftFlow;
    } catch (error) {
      return false;
    }
  }

  async function createAndSave() {
    try {
      const successSave: boolean = await tryToSaveFlow();

      if (successSave) {
        await flowSlice.createFlow();
      }
    } catch (e) {
      console.log("error");
    }
  }

  const saveAndLoadDraft = async () => {
    try {
      const successSave: boolean = await tryToSaveFlow();
      if (successSave) {
        await tryToSaveFlow();
        await flowSlice.loadFlowFromDraft(props.flowIdToLoad);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveAndLoadLive = async () => {
    try {
      const successSave: boolean = await tryToSaveFlow();
      if (successSave) {
        await flowSlice.loadFlow(props.flowIdToLoad);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function saveAndLeave() {
    try {
      const saveSuccess: boolean = await tryToSaveFlow();
      if (saveSuccess) {
        await modalSlice.toggleUpdateFlowModal(false);
        await navigate("/dashboard/servers");
      }
    } catch (e) {
      console.error(e);
    }
  }

  const loadDraftWithoutSaving = async () => {
    try {
      await flowSlice.loadFlowFromDraft(props.flowIdToLoad);
      await modalSlice.toggleUpdateFlowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  const loadLiveWithoutSaving = async () => {
    try {
      await flowSlice.loadFlow(props.flowIdToLoad);
      await modalSlice.toggleUpdateFlowModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  function leaveWithoutSaving() {
    modalSlice.toggleUpdateFlowModal(false);
    navigate("/dashboard/servers");
  }

  function cancelSaving() {
    modalSlice.toggleUpdateFlowModal(false);
  }

  function createWithoutSaving() {
    flowSlice.createFlow();
    modalSlice.toggleUpdateFlowModal(false);
  }

  function defineConfirmActions() {
    switch (props.actions) {
      case UpdateFlowActions.Create:
        return createAndSave();
      case UpdateFlowActions.SaveDraft:
        return tryToSaveFlow();
      case UpdateFlowActions.LoadLive:
        return saveAndLoadLive();
      case UpdateFlowActions.LoadDraft:
        return saveAndLoadDraft();
      case UpdateFlowActions.Quit:
        return saveAndLeave();
    }
  }

  function defineDeclineActions() {
    switch (props.actions) {
      case UpdateFlowActions.Create:
        return createWithoutSaving();
      case UpdateFlowActions.SaveDraft:
        return cancelSaving();
      case UpdateFlowActions.LoadLive:
        return loadLiveWithoutSaving();
      case UpdateFlowActions.LoadDraft:
        return loadDraftWithoutSaving();
      case UpdateFlowActions.Quit:
        return leaveWithoutSaving();
    }
  }

  return (
    <>
      {modalSlice.updateFlowModal.isVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}></header>
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
                <button onClick={() => defineConfirmActions()}>YES</button>
                <button onClick={() => defineDeclineActions()}>NO</button>
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
