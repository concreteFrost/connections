import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";


function MessageModal() {

    const messageModal = useStore((state) => state.modalWindows.messageModal);
    const toggleMessageModal = useStore((state) => state.toggleMessageModal);

    return (<>
        {messageModal.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    {messageModal.message}
                </main>
                <footer className={s.modal_footer}>
                    <div className={s.buttons_wrapper}>
                        <button onClick={toggleMessageModal}>OK</button>
                    </div>
                </footer>
            </div>
        </div> : null}
    </>)

}

export default MessageModal;