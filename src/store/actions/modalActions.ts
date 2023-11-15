import { RFState } from "../types/rfState"

//MODAL WITH MESSAGE
export const toggleMessageModal = (get: () => RFState, set: any) => () => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            messageModal: {
                ...state.modalWindowsSlice.messageModal,
                isVisible: !state.modalWindowsSlice.messageModal.isVisible
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
                subfolder: subfolder
            }
        }
    }))
}