import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";

interface ModalProps {
    matchFlow: any;
}
function UpdateFlowModal(props: ModalProps) {

    const flow = useStore((state) => state.flow.flowName)
    const updateFlow = useStore((state) => state.updateFlow);
    const updateFlowModal = useStore((state) => state.modalWindows.updateFlowModal);
    const toggleUpdateFlowModal = useStore((state) => state.toggleUpdateFlowModal);
    function updateAndSave() {
        updateFlow(props.matchFlow)
        toggleUpdateFlowModal();
    }

    return (<>
        {updateFlowModal.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    Would you like to save changes in {flow} ?
                </main>
                <footer className={s.modal_footer}>
                    <div className={s.buttons_wrapper}>
                        <button onClick={updateAndSave}>YES</button>
                        <button onClick={toggleUpdateFlowModal}>NO</button>
                    </div>
                </footer>
            </div>
        </div> : null}
    </>)

}

export default UpdateFlowModal;