import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { useState } from "react";
import { approveAndReleaseAPI } from "../../api/draft";

function ApproveModal() {
  const {approveFlowModal, toggleApproveFlowModal} = useStore(
    (state) => state.modalWindowsSlice
  );
  const toggleapproveModal = useStore(
    (state) => state.modalWindowsSlice.toggleApproveFlowModal
  );
  const [keepDraft, setKeepDraft] = useState<boolean>(false);

  function approveDraftFlow() {
    approveAndReleaseAPI(approveFlowModal.draftIdToApprove,keepDraft).then((res:any)=>{
        console.log(approveFlowModal)
        if(res.data.success){

        }
    }).catch((e)=>{
        console.log('approve error',e)
    })
  }
  return (
    <>
      {approveFlowModal.isVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>APPROVE</header>
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
                <button onClick={approveDraftFlow}>Approve</button>
                <button onClick={() => toggleapproveModal(false, "")}>
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
