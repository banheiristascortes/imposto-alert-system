import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface TrendData {
  mes: string;
  icms: number;
  iss: number;
  outros: number;
}

export const TrendChart = () => {
  const [data, setData] = useState<TrendData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const trendData = await api.getTrendChartData();
      setData(trendData);
    };
    fetchData();
  }, []);

  if (!data.length) return null;

  return (
    <Card className="p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">
        Tendência de Alterações por Tipo
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="icms"
              stroke="#1E3A8A"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="iss"
              stroke="#2563EB"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="outros"
              stroke="#60A5FA"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};