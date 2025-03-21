import s from "./ModalWindow.module.scss";
import useStore from "store/store";
import { useState } from "react";
import { approveAndReleaseAPI, getDraftApi } from "api/draft";

function ApproveModal() {
  const {
    approveFlowModal,
    toggleApproveFlowModal,
    // setModalMessage,
    toggleMessageModal,
  } = useStore((state) => state.modalWindowsSlice);

  const { setCanApprove, setFlowIsEnabled } = useStore(
    (state) => state.flowSlice
  );

  const [keepDraft, setKeepDraft] = useState<boolean>(false);

  function showMessageOnApproval(message: string) {
    // setModalMessage(message);
    toggleMessageModal(message);
    toggleApproveFlowModal(false, "");
  }

  async function tryToApproveDraftFlow() {
    try {
      setFlowIsEnabled();
      const res: any = await getDraftApi(approveFlowModal.draftIdToApprove);
      if (res.data.success) {
        if (res.data.flowConfiguration.isEnabled) {
          showMessageOnApproval("cant approve flow that is currently enabled");
        } else {
          approveDraftFlow();
        }
      }
    } catch (e) {
      showMessageOnApproval("something went wrong");
    }

    async function approveDraftFlow() {
      const res: any = await approveAndReleaseAPI(
        approveFlowModal.draftIdToApprove,
        keepDraft
      );
      try {
        showMessageOnApproval(
          res.data.success ? "success!!!" : res.data.message
        );
        setCanApprove(false);
      } catch (error) {
        showMessageOnApproval("something went wrong");
      }
    }
  }
  return (
    <>
      {approveFlowModal.isVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>Approve</header>
            <main className={s.modal_body}>
              <span>{approveFlowModal.message}</span> will be validated and
              instantiated to the server now
            </main>
            <footer className={s.modal_footer}>
              <div className={s.buttons_wrapper}>
                <label>Keep draft</label>
                <input
                  type="checkbox"
                  checked={keepDraft}
                  onChange={() => {
                    setKeepDraft(!keepDraft);
                  }}
                />
                <button onClick={tryToApproveDraftFlow}>Approve</button>
                <button onClick={() => toggleApproveFlowModal(false, "")}>
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ApproveModal;
