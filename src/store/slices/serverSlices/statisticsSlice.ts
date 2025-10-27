import {
  FlowStatus,
  FlowStatusCapital,
  IChartData,
} from "shared/interfaces/IStatistics";
import { RFState } from "shared/types/rfState";
import statisticsActions from "store/actions/serverActions/statisticsActions";

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
    // {
    //   metrics: {
    //     CPUUsage: 0,
    //     MemoryUsage: 0,
    //     EnabledFlowCount: 0,
    //     DisabledFlowCount: 0,
    //     PausedFlowCount: 0,
    //     EnabledBlockCount: 0,
    //     DisabledBlockCount: 0,
    //     EnabledDirectoryMonitorCount: 0,
    //     DisabledDirectoryMonitorCount: 0,
    //     EnabledScheduleCount: 0,
    //     DisabledScheduleCount: 0,
    //     CurrentProcessesCount: 0,
    //     CompletedProcessesCount: 0,
    //     InputFilesProcessedCount: 0,
    //     SchedulesInitiatedCount: 0,
    //     AlertsRaised: 0,
    //   },
    //   time: moment().format("LTS"),
    // },
  ],
  setStatistics: statisticsActions(get, set).setStatistics,
  setFlowStatus: statisticsActions(get, set).setFlowStatus,
  updateChartData: statisticsActions(get, set).updateChartData,
  updateFlowBlocksRecord: statisticsActions(get, set).updateFlowBlocksRecord,
  getNewFlowRecord: statisticsActions(get, set).getNewFlowRecord,
  getNewStatistics: statisticsActions(get, set).getNewStatistics,
});

export default statisticsSlice;
