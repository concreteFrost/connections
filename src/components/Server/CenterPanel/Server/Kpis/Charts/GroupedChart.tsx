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
import LineForm from "../Forms/LineForm";
import { groupedChat, groupedLabels } from "../fakeData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface ChartProps {
  toggleChartState: (chartKey: keyof ChartsState) => void;
    chartState:ChartsState,
}

function GroupedChart(props:ChartProps) {
  return (
    <div className={s.wrapper}>
      <header>Grouped</header>
      <Bar
        height={300}
        width={500}
        className={s.line}
        options={groupedChat.options}
        data={{datasets:groupedChat.datasets, labels:groupedLabels}}
      ></Bar>
      <button onClick={()=>props.toggleChartState('grouped')}>view</button>
      {props.chartState.doughnut.isExpanded ? <LineForm></LineForm> : null}
    </div>
  );
}

export default GroupedChart;
