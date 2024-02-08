import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import s from "./Charts.module.scss";
import { ChartsState } from "../Kpis";
import LineForm from "../Forms/LineForm";

import { lineChart, lineChartLabels } from "../fakeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface ChartProps {
  toggleChartState: (chartKey: keyof ChartsState) => void;
  chartState: ChartsState;
}

function LineChart(props: ChartProps) {
  return (
    <div className={s.wrapper}>
      <div>
        <header>Line</header>
        <Line
          className={s.line}
          height={300}
          width={500}
          options={lineChart.options}
          data={{datasets:lineChart.dataSets,labels:lineChartLabels}}
        ></Line>
        <button onClick={() => props.toggleChartState("line")}>view</button>
      </div>
     {props.chartState.line.isExpanded ? <LineForm></LineForm> : null} 
    </div>
  );
}

export default LineChart;
