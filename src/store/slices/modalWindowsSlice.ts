import { modalActions } from "store/actions/sharedActions/modalActions";

export type ModalWindows = {
  updateFlowModal: {
    isVisible: boolean;
    subfolderName: string;
    flowIdToLoad: string;
    actions: {
      save: (args?: any) => void;
      discard: () => void;
    };
  };
  confirmationModal: {
    isVisible: boolean;
    message: string;
    action: () => void;
  };
  messageModal: {
    isVisible: boolean;
    message: string;
  };
  approveFlowModal: {
    isVisible: boolean;
    draftIdToApprove: string;
    message: string;
  };
  createTemplateFlowModal: {
    isVisible: boolean;
    liveFlowID: string;
    liveFlowName: string;
  };
  loadFlowModal: {
    isVisible: boolean;
  };

  toggleUpdateFlowModal: (isVisible: boolean) => void;
  toggleMessageModal: (message: string) => void;
  toggleApproveFlowModal: (
    isVisible: boolean,
    draftIdToApprove: string
  ) => void;
  toggleCreateTemplateFlowModal: (
    isVisible: boolean,
    liveFlowID?: string,
    liveFlowName?: string
  ) => void;
  toggleLoadFlowModal: (isVisible: boolean) => void;
  setApproveFlowModalMessage: (message: string) => void;
  setUpdateFlowSubfolderName: (subfolder: string) => void;
  setUpdateFlowModalSaveChanges: (saveChanges: boolean) => void;
  setUpdateFlowModalActions: (actions: {
    save: (args?: any) => void;
    discard: (args: any) => void;
  }) => void;
  setUpdateFlowModalFlowIdToLoad: (flowId: string) => void;
  toggleConfirmationModal: (isVisible: boolean, message: string) => void;
  setConfirmationModalActions: (action: any) => void;
};

const modalWindowsSlice = (get: any, set: any): ModalWindows => ({
  updateFlowModal: {
    isVisible: false,
    subfolderName: "",
    actions: {
      save: () => {},
      discard: () => {},
    },
    flowIdToLoad: "",
  },
  confirmationModal: {
    isVisible: false,
    message: "",
    action: () => {},
  },
  messageModal: {
    isVisible: false,
    message: "",
  },
  approveFlowModal: {
    isVisible: false,
    message: "",
    draftIdToApprove: "",
  },
  createTemplateFlowModal: {
    isVisible: false,
    liveFlowID: "",
    liveFlowName: "",
  },
  loadFlowModal: {
    isVisible: false,
  },

  toggleUpdateFlowModal: modalActions(get, set).toggleUpdateFlowModal,
  toggleMessageModal: modalActions(get, set).toggleMessageModal,
  setUpdateFlowSubfolderName: modalActions(get, set).setUpdateFlowSubfolderName,
  toggleApproveFlowModal: modalActions(get, set).toggleApproveFlowModal,
  toggleCreateTemplateFlowModal: modalActions(get, set)
    .toggleCreateTemplateFlowModal,
  setApproveFlowModalMessage: modalActions(get, set).setApproveFlowModalMessage,
  setUpdateFlowModalSaveChanges: modalActions(get, set)
    .setUpdateFlowModalSaveChanges,
  toggleLoadFlowModal: modalActions(get, set).toggleLoadFlowModal,
  setUpdateFlowModalActions: modalActions(get, set).setUpdateFlowModalActions,
  setUpdateFlowModalFlowIdToLoad: modalActions(get, set)
    .setUpdateFlowModalFlowIdToLoad,
  toggleConfirmationModal: modalActions(get, set).toggleConfirmationModal,
  setConfirmationModalActions: modalActions(get, set)
    .setConfirmationModalActions,
});

export default modalWindowsSlice;
