import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { createDraftFromLiveTemplateAPI } from "../../api/draft";
import { useState } from "react";


function CreateTemplateFlowModal() {

    const { isVisible, liveFlowID, liveFlowName } = useStore((state) => state.modalWindowsSlice.createTemplateFlowModal);
    const createDraftFromLiveTemplate = useStore((state) => state.flowSlice.createFlowFromTemplate);
    const [newDraftName, setNewDraftName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const toggleCreateTemplateFlowModal = useStore((state) => state.modalWindowsSlice.toggleCreateTemplateFlowModal);
    const toggleLoadFlowModal = useStore((state) => state.modalWindowsSlice.toggleLoadFlowModal);
    const createFlow = useStore((state) => state.flowSlice.createFlow)

    async function createTemplateFlow() {
        if (newDraftName.length === 0) {
            setErrorMessage('*draft name cant be blank')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
        else {
            createDraftFromLiveTemplate(liveFlowID, newDraftName);
            toggleCreateTemplateFlowModal(false)
            toggleLoadFlowModal(false)
        }

    }

    return (<>
        {isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}>Create draft from template</header>
                <main className={s.modal_body}>
                    Would you like to create a new draft from <span>{liveFlowName}</span> ?
                </main>
                <div className={s.warning_message}>
                    <p> Warning! </p>
                    <p> All unsaved changes in the current flow will be ignored!</p>

                </div>
                <footer className={s.modal_footer}>
                    <div className={s.buttons_wrapper}>
                        <label>New Draft Name:</label>
                        <input
                            type="text"
                            value={newDraftName}
                            onChange={(e) => {
                                setNewDraftName(e.target.value)
                            }}
                        />
                        <button onClick={createTemplateFlow}>Create</button>
                        <button onClick={() => toggleCreateTemplateFlowModal(false, "")}>
                            Cancel
                        </button>
                    </div>
                    <div className={s.error_message}>
                        {errorMessage}
                    </div>

                </footer>
            </div>
        </div> : null}
    </>)

}

export default CreateTemplateFlowModal;