import { modalActions } from "../actions/modalActions";
import { RFState } from "../types/rfState";

export type ModalWindows = {
    updateFlowModal: {
        isVisible: boolean,
        subfolderName: string,
        flowIdToLoad: string,
        actions: {
            save: (args?: any) => void;
            discard: () => void;
        }
    },
    confirmationModal: {
        isVisible: boolean,
        message: string,
        action: () => void;
    },
    messageModal: {
        isVisible: boolean,
        message: string,
    },
    approveFlowModal: {
        isVisible: boolean,
        draftIdToApprove: string,
        message: string
    },
    createTemplateFlowModal: {
        isVisible: boolean,
        liveFlowID: string,
        liveFlowName: string
    },
    loadFlowModal: {
        isVisible: boolean
    },

    toggleUpdateFlowModal: (isVisible: boolean) => void;
    toggleMessageModal: () => void;
    toggleApproveFlowModal: (isVisible: boolean, draftIdToApprove: string) => void;
    toggleCreateTemplateFlowModal: (isVisible: boolean, liveFlowID?: string, liveFlowName?: string) => void;
    toggleLoadFlowModal: (isVisible: boolean) => void;
    setApproveFlowModalMessage: (message: string) => void;
    setModalMessage: (message: string) => void;
    setUpdateFlowSubfolderName: (subfolder: string) => void;
    setUpdateFlowModalSaveChanges: (saveChanges: boolean) => void;
    setUpdateFlowModalActions: (actions: { save: (args?: any) => void, discard: (args: any) => void }) => void;
    setUpdateFlowModalFlowIdToLoad: (flowId: string) => void;
    toggleConfirmationModal: (isVisible: boolean, message: string) => void;
    setConfirmationModalActions: (action: any) => void;

}

const modalWindowsSlice = (get: any, set: any): ModalWindows => ({
    updateFlowModal: {
        isVisible: false,
        subfolderName: '',
        actions: {
            save: () => { },
            discard: () => { },
        },
        flowIdToLoad: ''

    },
    confirmationModal: {
        isVisible: false,
        message: '',
        action: () => { },
    },
    messageModal: {
        isVisible: false,
        message: '',
    },
    approveFlowModal: {
        isVisible: false,
        message: '',
        draftIdToApprove: '',
    },
    createTemplateFlowModal: {
        isVisible: false,
        liveFlowID: '',
        liveFlowName: ''
    },
    loadFlowModal: {
        isVisible: false
    },

    toggleUpdateFlowModal: modalActions.toggleUpdateFlowModal(get, set),
    toggleMessageModal: modalActions.toggleMessageModal(get, set),
    setModalMessage: modalActions.setModalMessage(get, set),
    setUpdateFlowSubfolderName: modalActions.setUpdateFlowSubfolderName(get, set),
    toggleApproveFlowModal: modalActions.toggleApproveFlowModal(get, set),
    toggleCreateTemplateFlowModal: modalActions.toggleCreateTemplateFlowModal(get, set),
    setApproveFlowModalMessage: modalActions.setApproveFlowModalMessage(get, set),
    setUpdateFlowModalSaveChanges: modalActions.setUpdateFlowModalSaveChanges(get, set),
    toggleLoadFlowModal: modalActions.toggleLoadFlowModal(get, set),
    setUpdateFlowModalActions: modalActions.setUpdateFlowModalActions(get, set),
    setUpdateFlowModalFlowIdToLoad: modalActions.setUpdateFlowModalFlowIdToLoad(get, set),
    toggleConfirmationModal: modalActions.toggleConfirmationModal(get, set),
    setConfirmationModalActions: modalActions.setConfirmationModalActions(get, set)

})

export default modalWindowsSlice;