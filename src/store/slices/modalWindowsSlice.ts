import { modalActions } from "../actions/modalActions";
import { RFState } from "../types/rfState";

export type ModalWindows = {
    updateFlowModal: {
        isVisible: boolean,

    }
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
    }

    toggleUpdateFlowModal: (isVisible: boolean) => void;
    toggleMessageModal: () => void;
    toggleApproveFlowModal: (isVisible: boolean, draftIdToApprove: string) => void;
    toggleCreateTemplateFlowModal: (isVisible: boolean, liveFlowID?: string, liveFlowName?: string) => void;
    toggleLoadFlowModal: (isVisible: boolean) => void;
    setApproveFlowModalMessage: (message: string) => void;
    setModalMessage: (message: string) => void;
    setUpdateFlowSubfolderName: (subfolder: string) => void;

}

const modalWindowsSlice = (get: any, set: any): ModalWindows => ({
    updateFlowModal: {
        isVisible: false,

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
    toggleLoadFlowModal: (isVisible: boolean) => {
        set((state: RFState) => ({
            modalWindowsSlice: {
                ...state.modalWindowsSlice,
                loadFlowModal: {
                    isVisible: isVisible
                }
            }
        }))
    }
})

export default modalWindowsSlice;