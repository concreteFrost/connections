import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./Charts.module.scss";
import { ChartsState } from "../Kpis";
import LineForm from "../Forms/LineForm";
import { doughnutChart, doughnutLabels } from "../fakeData";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  toggleChartState: (chartKey: keyof ChartsState) => void;
  chartState: ChartsState;
}

function DoughnutChart(props: ChartProps) {
  return (
    <div className={s.wrapper}>
     
        <header>Doughnut</header>
        <Doughnut
          height={300}
          width={500}
          className={s.pie}
          data={{datasets:doughnutChart.datasets, labels:doughnutLabels}}
          options={doughnutChart.options}
        ></Doughnut>
        <button onClick={() => props.toggleChartState("doughnut")}>view</button>
    
     
    </div>
  );
}

export default DoughnutChart;
