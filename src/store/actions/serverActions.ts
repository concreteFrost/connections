import { getBlockStatisticsAPI, getFlowApi } from "../../api/flow";
import { RFState } from "../types/rfState";

export const getCurrentFlow = (get: any, set: any) => async (flowId: string) => {
  let currentFlow = {
    blockData: []
  }
  let _stats = [{}]

  await getFlowApi(flowId).then((res: any) => {
    currentFlow = res.data.flowData
  }).catch(e => console.log(e))

  await getBlockStatisticsAPI(flowId).then((res: any) => {
    _stats = res.data.statistics

  }).catch(e => console.log(e))
    .finally(() => {
      set((state: RFState) => ({
        server: {
          ...state.server,
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

