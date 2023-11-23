import { getBlockStatisticsAPI } from "../../api/flow";
import { createUpdateDraftFromLiveAPI } from "../../api/draft"
import { RFState } from "../types/rfState";

export const getCurrentFlow = (get: () => RFState, set: any) => async (flowId: string) => {
  let currentFlow = {
    blockData: []
  }
  let _stats = [{}]

  await createUpdateDraftFromLiveAPI(flowId).then((res: any) => {
    console.log(res.data)
    currentFlow = res.data.flowConfiguration

  }).catch(e => console.log(e))

  await getBlockStatisticsAPI(flowId).then((res: any) => {
    _stats = res.data.statistics

  }).catch(e => console.log(e))
    .finally(() => {
      set((state: RFState) => ({
        serverSlice: {
          ...state.serverSlice,
          currentFlow: {
            ...currentFlow, blockData: currentFlow.blockData.map((block: any) => {
              const matchingStat = _stats.find((stat: any) => stat.blockId === block.blockIdentifier);
              return {
                ...block,

                stats: matchingStat ?? {}
              }
            })
          }
        }
      })
      )
    })
};

export const toggleFlowControlState = (get: () => RFState, set: any) => (isEnabled: boolean) => {
  set((state: RFState) => ({
    serverSlice: {
      ...state.serverSlice,
      currentFlow: {
        ...state.serverSlice.currentFlow,
        isEnabled: isEnabled
      }
    }

  }))

  console.log('current flow', get())
}


const serverActions = {
  getCurrentFlow: getCurrentFlow,
  toggleFlowControlState: toggleFlowControlState

}

export default serverActions;
