import LineChart from "./Charts/LineChart";
import VerticalBaChart from "./Charts/VerticalBarChart";
import s from "./Kpis.module.scss";
import PieChart from "./Charts/PieChart";
import GroupedChart from "./Charts/GroupedChart";
import DoughnutChart from "./Charts/DoughnutChart";
import ScatterChart from "./Charts/ScatterChart";
import { useState } from "react";
import LineForm from "./Forms/LineForm";

export interface ChartsState {
  doughnut: { isVisible: boolean; isExpanded: boolean };
  grouped: { isVisible: boolean; isExpanded: boolean };
  line: { isVisible: boolean; isExpanded: boolean };
  pie: { isVisible: boolean; isExpanded: boolean };
  scatter: { isVisible: boolean; isExpanded: boolean };
  vertical: { isVisible: boolean; isExpanded: boolean };
}

const initialChartsState: ChartsState = {
  doughnut: { isVisible: true, isExpanded: false },
  grouped: { isVisible: true, isExpanded: false },
  line: { isVisible: true, isExpanded: false },
  pie: { isVisible: true, isExpanded: false },
  scatter: { isVisible: true, isExpanded: false },
  vertical: { isVisible: true, isExpanded: false },
};

function Kpis() {
  const [chartsState, setChartsState] =
    useState<ChartsState>(initialChartsState);
  const [isChartExpanded, setChartExpanded] = useState<Boolean>(false);

  function toggleChartState(chartName?: keyof ChartsState) {
    setChartsState(
      (prevState): ChartsState => ({
        ...Object.fromEntries(
          Object.entries(prevState).map(([key, value]: any) => [
            key,
            { ...value, isVisible: chartName ? key === chartName : true },
          ])
        ),
      })
    );

    setChartExpanded(!!chartName);
  }

  const gridClasses = `${s.cols_3} ${
    isChartExpanded ? s["resized"] : s["not_resized"]
  }`;

  return (
    <div className={s.wrapper}>
      {/* <div className={s.header}>
        <button onClick={() => props.setCurrentView("table")}>SERVER</button>
        <button onClick={() => props.setCurrentView("search")}>
          LOG SEARCH
        </button>
        {isChartExpanded ? (
        <button onClick={() => toggleChartState()}>CLOSE</button>
      ) : null}
      </div> */}

      <div className={gridClasses}>
        {isChartExpanded ? <LineForm></LineForm> : null}
        {chartsState.line.isVisible ? (
          <LineChart
            toggleChartState={toggleChartState}
            chartState={chartsState}
          ></LineChart>
        ) : null}
        {chartsState.vertical.isVisible ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default Kpis;
