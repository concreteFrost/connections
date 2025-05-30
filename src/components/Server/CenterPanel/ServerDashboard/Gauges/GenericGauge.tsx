import GaugeChart from "react-gauge-chart";
import s from "../ServerDashboard.module.scss";
import React from "react";

type Props = {
  label: string;
  value: number;
};

function GenericGauge({ label, value }: Props) {
  return (
    <div>
      <h5>{label}</h5>
      <GaugeChart
        className={s.gauge}
        id="gauge-chart1"
        nrOfLevels={20}
        colors={["#00C49F", "#FFC371", "#FF5F6D"]}
        arcWidth={0.3}
        percent={value}
        style={{ width: "200px" }}
      />
    </div>
  );
}

export default React.memo(GenericGauge);
