import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import s from "./Charts.module.scss";
import { ChartsState } from "../Kpis";
import { pieChartLabels, pieChartsData } from "../fakeData";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps{
  toggleChartState: (chartKey : keyof ChartsState)=>void;
  chartState:ChartsState,
}

function PieChart(props:ChartProps) {
  return (
    <div className={s.wrapper}>
      <header>Test</header>
      <Pie
        height={300}
        width={500}
        className={s.pie}
        data={{datasets:pieChartsData.datasets,labels:pieChartLabels}}
        options={pieChartsData.options}
      ></Pie>
      <button onClick={()=>props.toggleChartState('pie')}>view</button>
    </div>
  );
}

export default PieChart;
