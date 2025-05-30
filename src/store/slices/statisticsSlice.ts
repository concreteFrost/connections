import moment from "moment";
import {
  FlowStatus,
  FlowStatusCapital,
  IChartData,
} from "store/interfaces/IStatistics";
import { RFState } from "store/types/rfState";

const MAX_CHART_DATA_TO_STORE = 100;

export type StatusSlice = {
  statistics: FlowStatus[];
  chartData: Array<IChartData>;
  setFlowStatus: (flowId: string, status: number) => void;
  setStatistics: (stats: FlowStatus[]) => void;
  updateChartData: (data: IChartData) => void;
  updateFlowBlocksRecord: (
    flowId: string,
    flowStatus: FlowStatusCapital
  ) => void;
  getNewFlowRecord: (record: FlowStatusCapital) => void;
  getNewStatistics: () => void;
};

const statisticsSlice = (get: () => RFState, set: any): StatusSlice => ({
  statistics: [],
  chartData: [
    {
      metrics: {
        CPUUsage: 0,
        MemoryUsage: 0,
        EnabledFlowCount: 0,
        DisabledFlowCount: 0,
        PausedFlowCount: 0,
        EnabledBlockCount: 0,
        DisabledBlockCount: 0,
        EnabledDirectoryMonitorCount: 0,
        DisabledDirectoryMonitorCount: 0,
        EnabledScheduleCount: 0,
        DisabledScheduleCount: 0,
        CurrentProcessesCount: 0,
        CompletedProcessesCount: 0,
        InputFilesProcessedCount: 0,
        SchedulesInitiatedCount: 0,
        AlertsRaised: 0,
      },
      time: moment().format("LTS"),
    },
  ],
  setStatistics(stats: FlowStatus[]) {
    set((store: RFState) => ({
      statisticsSlice: {
        ...store.statisticsSlice,
        statistics: stats,
      },
    }));
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
  updateChartData: (data: IChartData) => {
    const metrics = [...get().statisticsSlice.chartData, data];
    console.log(data);
    if (metrics.length > MAX_CHART_DATA_TO_STORE) {
      metrics.splice(0, metrics.length - MAX_CHART_DATA_TO_STORE);
    }
    set((store: RFState) => ({
      statisticsSlice: {
        ...store.statisticsSlice,
        chartData: metrics,
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
    }));
  },
  getNewStatistics() {},
});

export default statisticsSlice;
