import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { estado: "SP", alteracoes: 12 },
  { estado: "RJ", alteracoes: 8 },
  { estado: "MG", alteracoes: 6 },
  { estado: "RS", alteracoes: 5 },
  { estado: "PR", alteracoes: 4 },
];

export const StateChangesChart = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Alterações por Estado</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="alteracoes"
              fill="#1E3A8A"
              radius={[4, 4, 0, 0]}
              className="transition-all duration-300 hover:opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};