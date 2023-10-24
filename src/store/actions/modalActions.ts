import { RFState } from "../types/rfState"

export const toggleMessageModal = (get: any, set: any) => () => {
    set((state: RFState) => ({
        modalWindows: {
            ...state.modalWindows,
            messageModal: {
                ...state.modalWindows.messageModal,
                isVisible: !state.modalWindows.messageModal.isVisible
            }
        }
    }))
}

export const setModalMessage = (get: any, set: any) => (message: string) => {
    set((state: RFState) => ({
        modalWindows: {
            ...state.modalWindows,
            messageModal: {
                ...state.modalWindows.messageModal,
                message: message
            }
        }
    }))
}

export const toggleUpdateFlowModal = (get: any, set: any) => () => {
    set((state: RFState) => ({
        modalWindows: {
            ...state.modalWindows,
            updateFlowModal: {
                ...state.modalWindows.updateFlowModal,
                isVisible: !state.modalWindows.updateFlowModal.isVisible
            }
        }
    }))
}