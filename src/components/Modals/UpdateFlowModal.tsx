import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { checkExistingFlowInDataBase } from "../../store/actions/utils/flowUtils";
import { useNavigate } from "react-router";

export enum UpdateFlowProcedures {
    Save,
    Load,
    New,
    Quit
}
interface UpdateFlowProps {
    currentProcedure: UpdateFlowProcedures
    flowToLoadID?: string
    toggleLoadFlowModal?: () => void;
}
function UpdateFlowModal(props: UpdateFlowProps) {

    const flow = useStore((state) => state.flowSlice.flow.flowName)
    const createFlow = useStore((state) => state.flowSlice.createFlow);
    const saveFlow = useStore<any>((state) => state.flowSlice.saveFlow);
    const updateFlowModal = useStore((state) => state.modalWindowsSlice.updateFlowModal);
    const loadFlow = useStore((state) => state.flowSlice.loadFlow);
    const updateFlow = useStore((state) => state.flowSlice.updateFlow);
    const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);
    const toggleMessageModal = useStore((state) => state.modalWindowsSlice.toggleMessageModal);

    const navigate = useNavigate();

    async function tryToSaveFlow() {
        try {
            const match = await checkExistingFlowInDataBase(flow);
            if (match) {
                await updateFlow(match);
            } else {
                await saveFlow();

            }
        } catch (error) {
            console.log('error')
        }
        finally {
            toggleUpdateFlowModal(false)
        }

    }
    async function createAndSave() {
        try {
            await tryToSaveFlow();
            await createFlow();
            await toggleUpdateFlowModal(false);
        }
        catch (e) {
            console.log('error')
        }
    }

    async function createWithoutSaving() {
        createFlow();
        toggleUpdateFlowModal(false);
    }

    async function saveAndLoad() {
        try {
            await tryToSaveFlow();
            await loadFlow(props.flowToLoadID!);
            await toggleUpdateFlowModal(false);
            if (props.toggleLoadFlowModal) {
                await props.toggleLoadFlowModal();
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    async function loadWithoutSaving() {

        try {
            await loadFlow(props.flowToLoadID!);
            await toggleUpdateFlowModal(false);
            if (props.toggleLoadFlowModal) {
                await props.toggleLoadFlowModal();
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    async function saveAndLeave() {
        try {
            await tryToSaveFlow();
            await toggleUpdateFlowModal(false);
            await toggleMessageModal();
            await navigate('/dashboard/servers');
        }
        catch (e) {
            console.log(e)
        }
    }

    async function leaveWithoutSaving() {
        try {
            await toggleUpdateFlowModal(false);
            await navigate('/dashboard/servers');
        }
        catch (e) {
            console.log(e)
        }
    }

    return (<>
        {updateFlowModal.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}></header>
                <main className={s.modal_body}>
                    Would you like to save changes in {flow} ?
                </main>
                <footer className={s.modal_footer}>
                    {/*CREATE AND SAVE*/}
                    {props.currentProcedure === UpdateFlowProcedures.New ?
                        <div className={s.buttons_wrapper}>
                            <button onClick={createAndSave}>YES</button>
                            <button onClick={createWithoutSaving}>NO</button>
                            <button onClick={() => { toggleUpdateFlowModal(false) }}>CANCEL</button>
                        </div>
                        : null}
                    {/*LOAD AND SAVE*/}
                    {props.currentProcedure === UpdateFlowProcedures.Load ?
                        <div className={s.buttons_wrapper}>
                            <button onClick={saveAndLoad}>YES</button>
                            <button onClick={loadWithoutSaving}>NO</button>
                            <button onClick={() => { toggleUpdateFlowModal(false) }}>CANCEL</button>
                        </div>
                        : null}
                    {/*SAVE*/}
                    {props.currentProcedure === UpdateFlowProcedures.Save ?
                        <div className={s.buttons_wrapper}>
                            <button onClick={tryToSaveFlow}>YES</button>
                            <button onClick={() => toggleUpdateFlowModal(false)}>NO</button>
                            <button onClick={() => { toggleUpdateFlowModal(false) }}>CANCEL</button>
                        </div>
                        : null}
                    {/*QUIT */}
                    {props.currentProcedure === UpdateFlowProcedures.Quit ?
                        <div className={s.buttons_wrapper}>
                            <button onClick={saveAndLeave}>YES</button>
                            <button onClick={leaveWithoutSaving}>NO</button>
                            <button onClick={() => { toggleUpdateFlowModal(false) }}>CANCEL</button>
                        </div>
                        : null}
                </footer>
            </div>
        </div> : null}
    </>)

}

export default UpdateFlowModal;