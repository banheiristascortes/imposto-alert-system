import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

const mockData = [
  { estado: "SP", alteracoes: 12, impacto: "Alto", detalhes: "Principais mudanças em ICMS" },
  { estado: "RJ", alteracoes: 8, impacto: "Médio", detalhes: "Alterações em ISS" },
  { estado: "MG", alteracoes: 6, impacto: "Médio", detalhes: "Novos convênios" },
  { estado: "RS", alteracoes: 5, impacto: "Baixo", detalhes: "Atualizações menores" },
  { estado: "PR", alteracoes: 4, impacto: "Baixo", detalhes: "Ajustes técnicos" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h4 className="font-semibold mb-2">{label}</h4>
        <p className="text-sm">
          Alterações: <span className="font-medium">{payload[0].value}</span>
        </p>
        <p className="text-sm">
          Impacto: <span className="font-medium">{payload[0].payload.impacto}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">{payload[0].payload.detalhes}</p>
      </div>
    );
  }
  return null;
};

export const StateChangesChart = () => {
  const [zoomDomain, setZoomDomain] = useState<{ start: number; end: number }>({
    start: 0,
    end: mockData.length - 1,
  });

  const handleZoomIn = () => {
    const newStart = Math.min(zoomDomain.start + 1, mockData.length - 2);
    const newEnd = Math.max(newStart + 1, zoomDomain.end - 1);
    setZoomDomain({ start: newStart, end: newEnd });
  };

  const handleZoomOut = () => {
    setZoomDomain({ start: 0, end: mockData.length - 1 });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Alterações por Estado</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mockData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis
              dataKey="estado"
              domain={[mockData[zoomDomain.start].estado, mockData[zoomDomain.end].estado]}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
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