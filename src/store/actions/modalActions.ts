import { RFState } from "../types/rfState"

export const toggleMessageModal = (get: any, set: any) => () => {
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

export const setModalMessage = (get: any, set: any) => (message: string) => {
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

export const toggleUpdateFlowModal = (get: any, set: any) => () => {
    set((state: RFState) => ({
        modalWindowsSlice: {
            ...state.modalWindowsSlice,
            updateFlowModal: {
                ...state.modalWindowsSlice.updateFlowModal,
                isVisible: !state.modalWindowsSlice.updateFlowModal.isVisible
            }
        }
    }))
}