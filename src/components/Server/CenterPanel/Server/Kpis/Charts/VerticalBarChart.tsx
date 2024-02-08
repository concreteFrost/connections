import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import s from "./Charts.module.scss";
import { faker } from "@faker-js/faker";
import { ChartsState } from "../Kpis";
import { verticalData, verticalLabels } from "../fakeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps{
  toggleChartState: (chartKey : keyof ChartsState)=>void;
  chartState:ChartsState,
}

function VerticalBaChart(props:ChartProps) {
  return (
    <div className={s.wrapper}>
      <header>Vertical Bar</header>
      <Bar
        height={300}
        width={500}
        className={s.line}
        options={verticalData.options}
        data={{ datasets: verticalData.dataSets, labels: verticalLabels }}
      ></Bar>
      <button onClick={()=>props.toggleChartState('vertical')}>view</button>
    </div>
  );
}

export default VerticalBaChart;
