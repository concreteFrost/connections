import { RFState } from "shared/types/rfState";

export const modalActions = (get: () => RFState, set: any) => ({
  // MODAL WITH MESSAGE
  toggleMessageModal: (message: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        messageModal: {
          ...state.modalWindowsSlice.messageModal,
          isVisible: !state.modalWindowsSlice.messageModal.isVisible,
          message,
        },
      },
    }));
  },

  setModalMessage: (message: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        messageModal: {
          ...state.modalWindowsSlice.messageModal,
          message,
        },
      },
    }));
  },

  // UPDATE FLOW MODAL
  toggleUpdateFlowModal: (isVisible: boolean) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        updateFlowModal: {
          ...state.modalWindowsSlice.updateFlowModal,
          isVisible,
        },
      },
    }));
  },

  setUpdateFlowSubfolderName: (subfolder: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        updateFlowModal: {
          ...state.modalWindowsSlice.updateFlowModal,
          subfolderName: subfolder,
        },
      },
    }));
  },

  setUpdateFlowModalSaveChanges: (saveChanges: boolean) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        updateFlowModal: {
          ...state.modalWindowsSlice.updateFlowModal,
          saveChanges,
        },
      },
    }));
  },

  toggleLoadFlowModal: (isVisible: boolean) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        loadFlowModal: {
          isVisible,
        },
      },
    }));
  },

  setUpdateFlowModalFlowIdToLoad: (flowId: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        updateFlowModal: {
          ...state.modalWindowsSlice.updateFlowModal,
          flowIdToLoad: flowId,
        },
      },
    }));
  },

  setUpdateFlowModalActions: (actions: {
    save: (args: any) => void;
    discard: (args: any) => void;
  }) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        updateFlowModal: {
          ...state.modalWindowsSlice.updateFlowModal,
          actions,
        },
      },
    }));
  },

  // APPROVE MODAL
  toggleApproveFlowModal: (isVisible: boolean, draftIdToApprove: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        approveFlowModal: {
          ...state.modalWindowsSlice.approveFlowModal,
          isVisible,
          draftIdToApprove,
        },
      },
    }));
  },

  setApproveFlowModalMessage: (message: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        approveFlowModal: {
          ...state.modalWindowsSlice.approveFlowModal,
          message,
        },
      },
    }));
  },

  toggleCreateTemplateFlowModal: (
    isVisible: boolean,
    liveFlowID?: string,
    liveFlowName?: string
  ) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        createTemplateFlowModal: {
          ...state.modalWindowsSlice.createTemplateFlowModal,
          isVisible,
          liveFlowID,
          liveFlowName,
        },
      },
    }));
  },

  // CONFIRMATION MODAL
  toggleConfirmationModal: (isVisible: boolean, message: string) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        confirmationModal: {
          ...state.modalWindowsSlice.confirmationModal,
          isVisible,
          message,
        },
      },
    }));
  },

  setConfirmationModalActions: (action: any) => {
    set((state: RFState) => ({
      modalWindowsSlice: {
        ...state.modalWindowsSlice,
        confirmationModal: {
          ...state.modalWindowsSlice.confirmationModal,
          action,
        },
      },
    }));
  },
});
