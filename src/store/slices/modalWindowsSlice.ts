import { setUpdateFlowSubfolderName, toggleMessageModal, toggleUpdateFlowModal, setModalMessage } from "../actions/modalActions";

export type ModalWindows = {
    updateFlowModal: {
        isVisible: boolean,

    }
    messageModal: {
        isVisible: boolean,
        message: string,
    }

    toggleUpdateFlowModal: (isVisible: boolean) => void;
    toggleMessageModal: () => void;
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

    toggleUpdateFlowModal: toggleUpdateFlowModal(get, set),
    toggleMessageModal: toggleMessageModal(get, set),
    setModalMessage: setModalMessage(get, set),
    setUpdateFlowSubfolderName: setUpdateFlowSubfolderName(get, set)
})

export default modalWindowsSlice;