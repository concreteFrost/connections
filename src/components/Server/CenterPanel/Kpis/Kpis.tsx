import s from "./Kpis.module.scss";
import { useState } from "react";
import GenericChart from "./Charts/GenericChart";

import useStore from "store/store";

function Kpis() {
  const { chartData } = useStore((state) => state.statisticsSlice);

  const [isChartExpanded, setChartExpanded] = useState<Boolean>(false);
  const gridClasses = `${s.cols_3} ${
    isChartExpanded ? s["resized"] : s["not_resized"]
  }`;

  return (
    <div className={s.wrapper}>
      <div className={gridClasses}>
        <GenericChart
          label="CPU"
          data={chartData.map((x) => ({
            CPUUsage: x.metrics.CPUUsage,
            time: x.time,
          }))}
          maxValue={100}
          dataKey="CPUUsage"
        />
        <GenericChart
          label="RAM"
          data={chartData.map((x) => ({
            MemoryUsage: x.metrics.MemoryUsage,
            time: x.time,
          }))}
          maxValue={4096}
          dataKey="MemoryUsage"
        />
      </div>
    </div>
  );
}

export default Kpis;

//  function toggleChartState(chartName?: keyof ChartsState) {
//     setChartsState(
//       (prevState): ChartsState => ({
//         ...Object.fromEntries(
//           Object.entries(prevState).map(([key, value]: any) => [
//             key,
//             { ...value, isVisible: chartName ? key === chartName : true },
//           ])
//         ),
//       })
//     );

//     setChartExpanded(!!chartName);
//   }

{
  /* {chartsState.vertical.isVisible ? (
          <VerticalBaChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></VerticalBaChart>
        ) : null}
        {chartsState.pie.isVisible ? (
          <PieChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></PieChart>
        ) : null}
        {chartsState.grouped.isVisible ? (
          <GroupedChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></GroupedChart>
        ) : null}
        {chartsState.scatter.isVisible ? (
          <ScatterChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></ScatterChart>
        ) : null}
        {chartsState.doughnut.isVisible ? (
          <DoughnutChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></DoughnutChart>
        ) : null} */
}
