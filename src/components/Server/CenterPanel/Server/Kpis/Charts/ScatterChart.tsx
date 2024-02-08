import s from "./Charts.module.scss";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { ChartsState } from "../Kpis";
import { scatterData } from "../fakeData";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ChartProps{
  toggleChartState: (chartKey : keyof ChartsState)=>void;
  chartState:ChartsState,
}

function ScatterChart(props:ChartProps) {
  return (
    <div className={s.wrapper}>
      <header>Scatter</header>
      <Scatter
        height={300}
        width={500}
        className={s.line}
        options={scatterData.options}
        data={{datasets:scatterData.datasets}}
      ></Scatter>
      <button onClick={()=>props.toggleChartState('scatter')}>view</button>
    </div>
  );
}

export default ScatterChart;
