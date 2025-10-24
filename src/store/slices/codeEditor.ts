import { RFState } from "shared/types/rfState";

export type CodeEditorSlice = {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
};

export const codeEditorSlice = (
  get: () => RFState,
  set: any
): CodeEditorSlice => ({
  isOpened: true,
  setOpened(isOpened) {
    set((state: RFState) => ({
      codeEditorSlice: {
        ...state.codeEditorSlice,
        isOpened: isOpened,
      },
    }));
  },
});

export default codeEditorSlice;
