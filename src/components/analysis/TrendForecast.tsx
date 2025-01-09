import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export const TrendForecast = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getTrendData();
      setData(response.data || []);
    };

    fetchData();
  }, []);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Previsão de Tendências</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="atual"
              stroke="#1E3A8A"
              fill="#1E3A8A"
              fillOpacity={0.2}
              name="Dados Atuais"
            />
            <Area
              type="monotone"
              dataKey="previsao"
              stroke="#60A5FA"
              strokeDasharray="5 5"
              fill="#60A5FA"
              fillOpacity={0.1}
              name="Previsão"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};