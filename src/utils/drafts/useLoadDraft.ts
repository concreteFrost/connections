import { useCallback } from "react";
import useStore from "store/store";
import { getDraftApi } from "api/draft";
import { AxiosResponse } from "axios";
import { FlowStructure } from "shared/interfaces/Iflow";

export function useLoadDraft() {
  const { loadFlowFromDraft, addFlowToTabs, allFlows } = useStore(
    (state) => state.flowSlice
  );
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  const handleLoadDraft = useCallback(
    async (flowIdToLoad: string) => {
      try {
        const res: AxiosResponse = await getDraftApi(flowIdToLoad);

        const match = allFlows.find(
          (flow: FlowStructure) =>
            flow.flowIdentifier === res.data.flowConfiguration.flowIdentifier
        );

        if (match) {
          toggleMessageModal("This flow is already opened");
          return false;
        }

        loadFlowFromDraft(res.data.flowConfiguration);
        addFlowToTabs(res.data.flowConfiguration);

        return true;
      } catch (e) {
        console.log("Error loading draft:", e);
      } finally {
        modalSlice.toggleUpdateFlowModal(false);
        modalSlice.toggleLoadFlowModal(false);
      }
    },
    [allFlows, loadFlowFromDraft, addFlowToTabs, toggleMessageModal, modalSlice]
  );

  return { handleLoadDraft };
}
