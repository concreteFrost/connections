import {modalActions } from "../actions/modalActions";

export type ModalWindows = {
    updateFlowModal: {
        isVisible: boolean,

    }
    messageModal: {
        isVisible: boolean,
        message: string,
    },
    approveFlowModal:{
        isVisible:boolean,
        draftIdToApprove:string,
        message:string
    }

    toggleUpdateFlowModal: (isVisible: boolean) => void;
    toggleMessageModal: () => void;
    toggleApproveFlowModal:(isVisible:boolean, draftIdToApprove:string)=>void;
    setApproveFlowModalMessage:(message:string)=>void;
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
    approveFlowModal:{
        isVisible:false,
        message:'',
        draftIdToApprove:'',
    },

    toggleUpdateFlowModal: modalActions.toggleUpdateFlowModal(get, set),
    toggleMessageModal: modalActions.toggleMessageModal(get, set),
    setModalMessage: modalActions.setModalMessage(get, set),
    setUpdateFlowSubfolderName: modalActions.setUpdateFlowSubfolderName(get, set),
    toggleApproveFlowModal: modalActions.toggleApproveFlowModal(get,set),
    setApproveFlowModalMessage: modalActions.setApproveFlowModalMessage(get,set)
})

export default modalWindowsSlice;