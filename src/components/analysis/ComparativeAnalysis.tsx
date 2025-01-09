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
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export const ComparativeAnalysis = () => {
  const { toast } = useToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const comparativeData = await api.getComparativeData();
      setData(comparativeData);
    };

    fetchData();
  }, []);

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
          <LineChart data={data}>
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