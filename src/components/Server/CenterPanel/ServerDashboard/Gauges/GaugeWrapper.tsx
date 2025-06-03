// Gauges/GaugeWrapper.tsx
import React from "react";
import s from "./GaugeWrapper.module.scss";
import useStore from "store/store";
import GenericGauge from "./GenericGauge/GenericGauge";

const GaugeWrapper = () => {
  const { chartData } = useStore((store) => store.statisticsSlice);
  console.log(chartData);

  const totalRam = 4096;

  let lastMetric = null;
  let lastCpuUsage = 0;
  let ramUsage = 0;

  if (chartData.length > 0) {
    lastMetric = chartData[chartData.length - 1].metrics;
    lastCpuUsage = lastMetric.CPUUsage / 100;
    ramUsage = lastMetric.MemoryUsage / totalRam;
  }

  return (
    <div className={s.wrapper}>
      {chartData.length > 0 && (
        <>
          <GenericGauge
            label="CPU"
            value={lastCpuUsage}
            maxTolerateValue={0.7}
          ></GenericGauge>
          <GenericGauge
            label="RAM"
            value={ramUsage}
            maxTolerateValue={0.7}
          ></GenericGauge>
        </>
      )}
    </div>
  );
};

export default React.memo(GaugeWrapper);
