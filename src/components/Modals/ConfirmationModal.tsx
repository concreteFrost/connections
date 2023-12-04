import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";

function ConfirmationModal() {

    const { isVisible, message, action } = useStore((state) => state.modalWindowsSlice.confirmationModal);
    const toggleConfirmationModal = useStore((state) => state.modalWindowsSlice.toggleConfirmationModal);
    return (<>
        {isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    {message}
                </main>
                <footer className={s.modal_footer}>
                    <div className={s.buttons_wrapper}>
                        <button onClick={() => {
                            action();
                            toggleConfirmationModal(false, '')
                        }}>Delete</button>
                        <button onClick={() => {
                            toggleConfirmationModal(false, '')
                        }}>Cancel</button>
                    </div>
                </footer>
            </div>
        </div> : null}
    </>)

}

export default ConfirmationModal;