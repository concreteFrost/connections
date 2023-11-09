import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { checkExistingFlowInDataBase } from "../../store/actions/utils/flowUtils";

export enum UpdateFlowProcedures {
    Save,
    Load,
    New
}
interface UpdateFlowProps {
    currentProcedure: UpdateFlowProcedures
    flowToLoadID?: string
}
function UpdateFlowModal(props: UpdateFlowProps) {

    const flow = useStore((state) => state.flowSlice.flow.flowName)
    const createFlow = useStore((state) => state.flowSlice.createFlow);
    const saveFlow = useStore<any>((state) => state.flowSlice.saveFlow);
    const updateFlowModal = useStore((state) => state.modalWindowsSlice.updateFlowModal);
    const loadFlow = useStore((state) => state.flowSlice.loadFlow);
    const updateFlow = useStore((state) => state.flowSlice.updateFlow);
    const toggleUpdateFlowModal = useStore((state) => state.modalWindowsSlice.toggleUpdateFlowModal);

    async function tryToSaveFlow() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                const match = await checkExistingFlowInDataBase(flow);
                if (match) {
                    updateFlow(match);
                } else {
                    saveFlow();
                }

                resolve(); // Resolve the promise when the operation is successful.
            } catch (error) {

                reject(error);
            }
        });
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
            await tryToSaveFlow()
            await loadFlow(props.flowToLoadID!);
            await toggleUpdateFlowModal(false);
        }

        catch (e) {
            console.log('save and load error', e);
        };

    }

    async function loadWithoutSaving() {
        loadFlow(props.flowToLoadID!);
        toggleUpdateFlowModal(false);

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
                </footer>
            </div>
        </div> : null}
    </>)

}

export default UpdateFlowModal;