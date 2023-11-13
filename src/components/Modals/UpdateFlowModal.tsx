import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { checkExistingFlowInDataBase } from "../../store/actions/utils/flowUtils";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export enum UpdateFlowProcedures {
    Save,
    Load,
    New,
    Quit
}
export interface UpdateFlowProps {

    confirm: () => void,
    decline: () => void,

}
function UpdateFlowModal(props: UpdateFlowProps) {

    const flowSlice = useStore((state) => state.flowSlice);
    const modalSlice = useStore((state) => state.modalWindowsSlice);

    const navigate = useNavigate();

    // function cancelSaving() {
    //     modalSlice.toggleUpdateFlowModal(false);
    // }

    // async function saveAndLeave() {
    //     try {
    //         await tryToSaveFlow();
    //         await modalSlice.toggleUpdateFlowModal(false);
    //         await modalSlice.toggleMessageModal();
    //         await navigate('/dashboard/servers');
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }


    // async function createAndSave() {
    //     try {
    //         await tryToSaveFlow();
    //         await flowSlice.createFlow();
    //         await modalSlice.toggleUpdateFlowModal(false);
    //     }
    //     catch (e) {
    //         console.log('error')
    //     }
    // }

    // function createWithoutSaving() {
    //     flowSlice.createFlow();
    //     modalSlice.toggleUpdateFlowModal(false);
    // }

    // function leaveWithoutSaving() {
    //     modalSlice.toggleUpdateFlowModal(false);
    //     navigate('/dashboard/servers');

    // }

    return (<>
        {modalSlice.updateFlowModal.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    Would you like to save changes in {flowSlice.flow.flowName} ?
                </main>
                <footer className={s.modal_footer}>
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