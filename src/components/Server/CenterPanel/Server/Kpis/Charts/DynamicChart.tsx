import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Scatter, Doughnut, Pie, Line } from "react-chartjs-2";
import { ChartsState } from "../Kpis";
import * as x from "../fakeData";
import s from "./Charts.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  toggleChartState: (chartKey: keyof ChartsState) => void;
  chartState: ChartsState;
  header: string;
}

function DynamicChart(props: ChartProps) {
  return (
    <div className={s.wrapper}>
      <header>{props.header}</header>
      {/*pie */}
      <Pie
        height={300}
        width={500}
        className={s.pie}
        data={{ datasets: x.pieChartsData.datasets, labels: x.pieChartLabels }}
        options={x.pieChartsData.options}
      ></Pie>
      {/**scatter */}
      <Scatter
        height={300}
        width={500}
        className={s.line}
        options={x.scatterData.options}
        data={{ datasets: x.scatterData.datasets }}
      ></Scatter>
      {/*doughnut */}
      <Doughnut
        height={300}
        width={500}
        className={s.pie}
        data={{ datasets: x.doughnutChart.datasets, labels: x.doughnutLabels }}
        options={x.doughnutChart.options}
      ></Doughnut>
      {/**grouped */}
      <Bar
        height={300}
        width={500}
        className={s.line}
        options={x.groupedChat.options}
        data={{ datasets: x.groupedChat.datasets, labels: x.groupedLabels }}
      ></Bar>
      {/**line */}
      <Line
        className={s.line}
        height={300}
        width={500}
        options={x.lineChart.options}
        data={{ datasets: x.lineChart.dataSets, labels: x.lineChartLabels }}
      ></Line>
      {/**vertical */}
      <Bar
        height={300}
        width={500}
        className={s.line}
        options={x.verticalData.options}
        data={{ datasets: x.verticalData.dataSets, labels: x.verticalLabels }}
      ></Bar>
      <button onClick={() => props.toggleChartState("pie")}>view</button>
    </div>
  );
}

export default DynamicChart;
