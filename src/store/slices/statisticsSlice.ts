import {
  FlowStatus,
  BlockStatistic,
  FlowStatusCapital,
  BlockStatisticCapital,
} from "../interfaces/IStatistics";
import { RFState } from "../types/rfState";

export type StatusSlice = {
  statistics: FlowStatus[];
  setFlowStatus: (flowId: string, status: number) => void;
  setStatistics: (stats: FlowStatus[]) => void;
  updateFlowBlocksRecord: (
    flowId: string,
    flowStatus: FlowStatusCapital
  ) => void;
  getNewFlowRecord: (record: FlowStatusCapital) => void;
  getNewStatistics: () => void;
};

const statisticsSlice = (get: () => RFState, set: any): StatusSlice => ({
  statistics: [],

  setStatistics(stats: FlowStatus[]) {
    set((store: RFState) => ({
      statisticsSlice: {
        ...store.statisticsSlice,
        statistics: stats,
      },
    }));
    console.log(get().statisticsSlice.statistics);
  },
  setFlowStatus(flowId: string, newStatus: number) {
    const updatedFlows = get().statisticsSlice.statistics?.map(
      (flow: FlowStatus) => {
        if (flow.flowId === flowId) {
          return {
            ...flow,
            status: newStatus,
          };
        } else {
          return flow;
        }
      }
    );
    set((store: RFState) => ({
      statisticsSlice: {
        ...store.statisticsSlice,
        statistics: updatedFlows,
      },
    }));
  },

  updateFlowBlocksRecord(flowId: string, flowStatus: FlowStatusCapital) {
    const updatedFlows = get().statisticsSlice.statistics?.map(
      (flow: FlowStatus) => {
        if (flow.flowId === flowId) {
          return {
            flowId: flowStatus.FlowId,
            name: flowStatus.Name,
            version: flowStatus.Version,
            createdBy: flowStatus.CreatedBy,
            dateCreated: flowStatus.DateCreated,
            lastUpdateBy: flowStatus.LastUpdateBy,
            lastUpdated: flowStatus.LastUpdated,
            startBlock: flowStatus.StartBlock,
            status: flowStatus.Status,
            enabled: flowStatus.Enabled,
            statistics: flowStatus.Statistics.map((stat: any) => ({
              blockId: stat.BlockId,
              name: stat.Name,
              type: stat.Type,
              isEnabled: stat.IsEnabled,
              errors: stat.Errors,
              fatalErrors: stat.FatalErrors,
              warnings: stat.Warnings,
            })),
          };
        } else {
          return flow;
        }
      }
    );

    set((store: RFState) => ({
      statisticsSlice: {
        ...store.statisticsSlice,
        statistics: updatedFlows,
      },
    }));

    console.log(updatedFlows);
  },

  getNewFlowRecord(record: FlowStatusCapital) {
    const newFlow: FlowStatus = {
      flowId: record.FlowId,
      name: record.Name,
      version: record.Version,
      createdBy: record.CreatedBy,
      dateCreated: record.DateCreated,
      lastUpdateBy: record.LastUpdateBy,
      lastUpdated: record.LastUpdated,
      startBlock: record.StartBlock,
      status: record.Status,
      enabled: record.Enabled,
      statistics: record.Statistics.map((stat: any) => ({
        blockId: stat.BlockId,
        name: stat.Name,
        type: stat.Type,
        isEnabled: stat.IsEnabled,
        errors: stat.Errors,
        fatalErrors: stat.FatalErrors,
        warnings: stat.Warnings,
      })),
    };

    set((store: RFState) => ({
        statisticsSlice: {
          ...store.statisticsSlice,
          statistics: [...store.statisticsSlice.statistics, newFlow],
        },
      })
    )

  },
  getNewStatistics() {},
});

export default statisticsSlice;
