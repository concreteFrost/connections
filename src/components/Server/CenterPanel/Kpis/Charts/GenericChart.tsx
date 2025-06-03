import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import s from "./GenericChart.module.scss";

interface GenericChartPoint {
  time: string;
  CPUUsage?: number;
  MemoryUsage?: number;
}

interface GenericChartProps {
  label: string;
  data: GenericChartPoint[];
  unit: "%" | "mb";
  maxValue: number;
  dataKey: keyof GenericChartPoint;
}

export default function GenericChart({
  label,
  data,
  unit,
  dataKey,
  maxValue,
}: GenericChartProps) {
  const peak = Math.max(...data.map((item: any) => item[dataKey]));
  return (
    <div className={s.wrapper}>
      <h3>{label}</h3>
      <ResponsiveContainer
        width="100%"
        height={300}
        style={{ margin: 0, padding: 0 }}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, maxValue]} />
          <Tooltip />
          <Line
            strokeWidth={1.5}
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <span className={s.current_usage}>
        <b>Current usage:</b> {data[data.length - 1][dataKey]} {unit}
      </span>
      <span className={s.current_usage}>
        <b>Peak:</b> {peak}
        {unit}
      </span>
    </div>
  );
}
