import { RFState } from "store/types/rfState";
import s from "../VisualMappingModal.module.scss";
import useStore from "store/store";

export default function OverwriteMappingModal() {
  const { confirmModal, resetConfirmModal } = useStore(
    (state: RFState) => state.visualMappingSlice
  );
  const { setIsLoading } = useStore((state) => state.loaderSlice);
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

  async function handlePerformAction() {
    if (!confirmModal.action) {
      resetConfirmModal();
      return;
    }

    try {
      setIsLoading(true);
      await confirmModal.action(); // <-- теперь поддерживает async
    } catch (err) {
      console.error(err);
      toggleMessageModal("Something went wrong while performing the action.");
    } finally {
      setIsLoading(false);
      resetConfirmModal();
    }
  }

  return (
    <>
      {confirmModal.isConfirmModalVisible && (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>CONFIRM</header>
            <main className={s.modal_body}>{confirmModal.message}</main>
            <footer className={s.modal_footer}>
              <div className={s.buttons_wrapper}>
                <button onClick={handlePerformAction}>Confirm</button>
                <button onClick={() => resetConfirmModal()}>Cancel</button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
