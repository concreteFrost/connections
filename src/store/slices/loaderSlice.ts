import { RFState } from "shared/types/rfState";

export type LoaderSlice = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const loaderSlice = (get: () => RFState, set: any): LoaderSlice => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    set((state: RFState) => ({
      loaderSlice: {
        ...state.loaderSlice,
        isLoading: isLoading,
      },
    }));
  },
});

export default loaderSlice;
