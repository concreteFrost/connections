import { useEffect } from "react";
import { getMetricsApi } from "api/data";
import { IMetrics } from "store/interfaces/IStatistics";
import useStore from "store/store";
import moment from "moment";
import { getUserSettingsData } from "store/actions/storageActions";

export default function useOnDashboardEnter() {
  const { updateChartData } = useStore((state) => state.statisticsSlice);
  useEffect(() => {
    const fetchChartData = async () => {
      const res = await getMetricsApi();

      if (res.status === 200) {
        const allMetrics = res.data.metrics;
        const lastMetric = allMetrics[allMetrics.length - 1];

        const formatted: IMetrics = {
          CPUUsage: lastMetric.cpuUsage ?? "",
          MemoryUsage: lastMetric.memoryUsage ?? "",
          EnabledFlowCount: lastMetric.enabledFlowCount ?? 0,
          DisabledFlowCount: lastMetric.disabledFlowCount ?? 0,
          PausedFlowCount: lastMetric.pausedFlowCount ?? 0,
          EnabledBlockCount: lastMetric.enabledBlockCount ?? 0,
          DisabledBlockCount: lastMetric.disabledBlockCount ?? 0,
          EnabledDirectoryMonitorCount:
            lastMetric.enabledDirectoryMonitorCount ?? 0,
          DisabledDirectoryMonitorCount:
            lastMetric.disabledDirectoryMonitorCount ?? 0,
          EnabledScheduleCount: lastMetric.enabledScheduleCount ?? 0,
          DisabledScheduleCount: lastMetric.disabledScheduleCount ?? 0,
          CurrentProcessesCount: lastMetric.currentProcessesCount ?? 0,
          CompletedProcessesCount: lastMetric.completedProcessesCount ?? 0,
          InputFilesProcessedCount: lastMetric.inputFilesProcessedCount ?? 0,
          SchedulesInitiatedCount: lastMetric.schedulesInitiatedCount ?? 0,
          AlertsRaised: lastMetric.alertsRaised ?? 0,
        };

        updateChartData({
          metrics: formatted,
          time: moment().format("LTS"),
        });
      }
    };

    fetchChartData();
    getUserSettingsData();
  }, []);

  return null;
}
