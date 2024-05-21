import { RFState } from "../types/rfState"

//MODAL WITH MESSAGE
export const toggleMessageModal = (get: () => RFState, set: any) => (message:string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            messageModal: {
                ...state.modalWindowsSlice.messageModal,
                isVisible: !state.modalWindowsSlice.messageModal.isVisible,
                message: message
            }
        }
    }))
}

export const setModalMessage = (get: () => RFState, set: any) => (message: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            messageModal: {
                ...state.modalWindowsSlice.messageModal,
                message: message
            }
        }
    }))
}

//UPDATE FLOW MODAL
export const toggleUpdateFlowModal = (get: () => RFState, set: any) => (isVisible: boolean) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                isVisible: isVisible
            }
        }
    }))
}


export const setUpdateFlowSubfolderName = (get: () => RFState, set: any) => (subfolder: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                subfolderName: subfolder
            }
        }
    }))
}

export const setUpdateFlowModalSaveChanges = (get: () => RFState, set: any) => (saveChanges: boolean) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                saveChanges: saveChanges
            }
        }
    }))

}

export const toggleLoadFlowModal = (get: () => RFState, set: any) => (isVisible: boolean) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            loadFlowModal: {
                isVisible: isVisible
            }
        }
    }))
}

export const setUpdateFlowModalFlowIdToLoad = (get: () => RFState, set: any) => (flowId: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                flowIdToLoad: flowId
            }
        }
    }))
}

export const setUpdateFlowModalActions = (get: () => RFState, set: any) => (actions: { save: (args: any) => void, discard: (args: any) => void }) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                actions: actions
            }
        }
    }))
}

//Approve Modal
export const toggleApproveFlowModal = (get: () => RFState, set: any) => (isVisible: boolean, draftIdToApprove: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            approveFlowModal: {
                ...state.modalWindowsSlice.approveFlowModal,
                isVisible: isVisible,
                draftIdToApprove: draftIdToApprove,
            }
        }
    }))
}


export const setApproveFlowModalMessage = (get: () => RFState, set: any) => (message: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            approveFlowModal: {
                ...state.modalWindowsSlice.approveFlowModal,
                message: message
            }
        }
    }))

}

export const toggleCreateTemplateFlowModal = (get: () => RFState, set: any) => (isVisible: boolean, liveFlowID?: string, liveFlowName?: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            createTemplateFlowModal: {
                ...state.modalWindowsSlice.createTemplateFlowModal,
                isVisible: isVisible,
                liveFlowID: liveFlowID,
                liveFlowName: liveFlowName
            }
        }
    }))

}

// CONFIRMATION MODAL
export const toggleConfirmationModal = (get: () => RFState, set: any) => (isVisible: boolean, message: string) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            confirmationModal: {
                ...state.modalWindowsSlice.confirmationModal,
                isVisible: isVisible,
                message: message
            }
        }
    }))
}

export const setConfirmationModalActions = (get: () => RFState, set: any) => (action: any) => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            confirmationModal: {
                ...state.modalWindowsSlice.confirmationModal,
                action: action
            }
        }
    }))
}

export const modalActions = {
    toggleMessageModal: toggleMessageModal,
    setModalMessage: setModalMessage,
    toggleUpdateFlowModal: toggleUpdateFlowModal,
    setUpdateFlowSubfolderName: setUpdateFlowSubfolderName,
    setUpdateFlowModalSaveChanges: setUpdateFlowModalSaveChanges,
    toggleApproveFlowModal: toggleApproveFlowModal,
    setApproveFlowModalMessage: setApproveFlowModalMessage,
    toggleCreateTemplateFlowModal: toggleCreateTemplateFlowModal,
    toggleConfirmationModal: toggleConfirmationModal,
    setConfirmationModalActions: setConfirmationModalActions,
    toggleLoadFlowModal: toggleLoadFlowModal,
    setUpdateFlowModalActions: setUpdateFlowModalActions,
    setUpdateFlowModalFlowIdToLoad: setUpdateFlowModalFlowIdToLoad
}