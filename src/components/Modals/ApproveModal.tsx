import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { useState } from "react";
import { approveAndReleaseAPI, getDraftApi } from "../../api/draft";
import { getFlowApi } from "../../api/flow";

function ApproveModal() {
  const { approveFlowModal, toggleApproveFlowModal, setModalMessage, toggleMessageModal } = useStore(
    (state) => state.modalWindowsSlice
  );
  const toggleLoadFlowModal = useStore((state) => state.modalWindowsSlice.toggleLoadFlowModal);

  const [keepDraft, setKeepDraft] = useState<boolean>(false);

  async function tryToApproveDraftFlow() {


    try {

      const res: any = await getDraftApi(approveFlowModal.draftIdToApprove);

      if (res.data.success) {
        console.log('success')

        if (res.data.flowConfiguration.isEnabled) {

          setModalMessage("cant approve flow that is currently enabled");
          toggleMessageModal();
          toggleApproveFlowModal(false, '')
        }

        else {
          approveDraftFlow();
        }
      }

    }
    catch (e) {
      console.log(e);
    }

    async function approveDraftFlow() {
      const res2: any = await approveAndReleaseAPI(approveFlowModal.draftIdToApprove, keepDraft);

      try {
        if (!res2.data.success) {
          setModalMessage(res2.data.message)
        }
        else {
          setModalMessage('success!!!')
          toggleLoadFlowModal(false);
        }
        toggleMessageModal()
        toggleApproveFlowModal(false, '')
      }
      catch (error) {
        console.log('approve error', error)
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
