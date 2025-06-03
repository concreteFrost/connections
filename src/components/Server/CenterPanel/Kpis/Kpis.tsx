import s from "./Kpis.module.scss";
import GenericChart from "./Charts/GenericChart";
import useStore from "store/store";

function Kpis() {
  const { chartData } = useStore((state) => state.statisticsSlice);

  return (
    <div className={s.wrapper}>
      {chartData.length > 0 && (
        <div className={s.metrics_wrapper}>
          <GenericChart
            label="CPU"
            data={chartData.map((x) => ({
              CPUUsage: x.metrics.CPUUsage,
              time: x.time,
            }))}
            maxValue={100}
            unit="%"
            dataKey="CPUUsage"
          />
          <GenericChart
            label="RAM"
            data={chartData.map((x) => ({
              MemoryUsage: x.metrics.MemoryUsage,
              time: x.time,
            }))}
            unit="mb"
            maxValue={parseInt(chartData[0].metrics.MemoryMax)}
            dataKey="MemoryUsage"
          />
        </div>
      )}
    </div>
  );
}

export default Kpis;
