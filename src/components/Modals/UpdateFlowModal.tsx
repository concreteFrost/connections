import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";

export interface UpdateFlowProps {

    confirm: () => void,
    decline: () => void,

}
function UpdateFlowModal(props: UpdateFlowProps) {

    const flowSlice = useStore((state) => state.flowSlice);
    const modalSlice = useStore((state) => state.modalWindowsSlice);

    return (<>
        {modalSlice.updateFlowModal.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    Would you like to save changes in <span>{flowSlice.flow.flowName}</span> ?
                </main>
                <footer className={s.modal_footer}>
                <div className={s.input_wrapper}>
                        <label>Subfolder Name: </label>
                        <input type="text" />
                    </div>
                    <div className={s.buttons_wrapper}>
                        <button onClick={() => props.confirm()}>YES</button>
                        <button onClick={() => props.decline()}>NO</button>
                        <button onClick={() => { modalSlice.toggleUpdateFlowModal(false) }}>CANCEL</button>
                    </div>
                   
                </footer>
            </div>
        </div> : null}
    </>)

}

export default UpdateFlowModal;