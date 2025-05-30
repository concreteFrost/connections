import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface GenericChartProps {
  label: string;
  data: Array<any>;
  maxValue: number;
  dataKey: string;
}

export default function GenericChart({
  label,
  data,
  dataKey,
  maxValue,
}: GenericChartProps) {
  return (
    <div>
      <h3 style={{ marginLeft: 35 }}>{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, maxValue]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
