// Gauges/GaugeWrapper.tsx
import React from "react";
import s from "../ServerDashboard.module.scss";
import useStore from "store/store";
import GenericGauge from "./GenericGauge";

const GaugeWrapper = () => {
  const { chartData } = useStore((store) => store.statisticsSlice);

  const totalRam = 4096;

  const lastMetric = chartData[chartData.length - 1].metrics;
  const lastCpuUsage = lastMetric.CPUUsage / 100;
  const ramUsage = lastMetric.MemoryUsage / totalRam;

  return (
    <div className={s.gauge_wrapper}>
      <GenericGauge label="CPU" value={lastCpuUsage}></GenericGauge>
      <GenericGauge label="RAM" value={ramUsage}></GenericGauge>
    </div>
  );
};

export default React.memo(GaugeWrapper);
