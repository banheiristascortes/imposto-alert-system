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
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockData = [
  { mes: "Jan", SP: 4, RJ: 3, MG: 2 },
  { mes: "Fev", SP: 6, RJ: 4, MG: 3 },
  { mes: "Mar", SP: 8, RJ: 6, MG: 4 },
  { mes: "Abr", SP: 5, RJ: 4, MG: 3 },
  { mes: "Mai", SP: 7, RJ: 5, MG: 4 },
];

export const ComparativeAnalysis = () => {
  const { toast } = useToast();

  const handleShare = () => {
    toast({
      title: "Link copiado!",
      description: "O link para esta análise foi copiado para sua área de transferência.",
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Análise Comparativa entre Estados</h3>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="SP"
              stroke="#1E3A8A"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="RJ"
              stroke="#2563EB"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="MG"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};