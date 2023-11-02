import actions from "../actions/combinedActions";

export type ModalWindows = {
    updateFlowModal: {
        isVisible: boolean,
    }
    messageModal: {
        isVisible: boolean,
        message: string,
    }

    toggleUpdateFlowModal: () => void;
    toggleMessageModal: () => void;
    setModalMessage: (message: string) => void;
}

const modalWindowsSlice = (get: any, set: any): ModalWindows => ({
    updateFlowModal: {
        isVisible: false,
    },
    messageModal: {
        isVisible: false,
        message: '',
    },

    toggleUpdateFlowModal: actions.modalActions.toggleUpdateFlowModal(get, set),
    toggleMessageModal: actions.modalActions.toggleMessageModal(get, set),
    setModalMessage: actions.modalActions.setModalMessage(get, set),
})

export default modalWindowsSlice;