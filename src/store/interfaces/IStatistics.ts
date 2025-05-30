export interface BlockStatistic {
  blockId: string;
  isEnabled: boolean;
  errors: number;
  fatalErrors: number;
  warnings: number;
}

export interface FlowStatus {
  flowId: string;
  name: string;
  version: string;
  createdBy: string;
  dateCreated: string;
  lastUpdateBy: string;
  lastUpdated: string | null;
  startBlock: string;
  status: number;
  enabled: boolean;
  statistics: BlockStatistic[];
}

export interface FlowStatusCapital {
  FlowId: string;
  Name: string;
  Version: string;
  CreatedBy: string;
  DateCreated: string;
  LastUpdateBy: string;
  LastUpdated: string | null;
  StartBlock: string;
  Status: number;
  Enabled: boolean;
  Statistics: BlockStatistic[];
}

export interface BlockStatisticCapital {
  BlockId: string;
  IsEnabled: boolean;
  Errors: number;
  FatalErrors: number;
  Warnings: number;
}

export interface NewStatisticMessage {
  FlowId: string;
  MessageCategory: number;
  NewStatus: number;
  NewStatistics: any | null;
  NewRecord: any | null;
  TimeStamp: string;
}

export interface IMetrics {
  CPUUsage: number;
  MemoryUsage: number;
  EnabledFlowCount: number;
  DisabledFlowCount: number;
  PausedFlowCount: number;
  EnabledBlockCount: number;
  DisabledBlockCount: number;
  EnabledDirectoryMonitorCount: number;
  DisabledDirectoryMonitorCount: number;
  EnabledScheduleCount: number;
  DisabledScheduleCount: number;
  CurrentProcessesCount: number;
  CompletedProcessesCount: number;
  InputFilesProcessedCount: number;
  SchedulesInitiatedCount: number;
  AlertsRaised: number;
}

export interface IChartData {
  metrics: IMetrics;
  time: string;
}
