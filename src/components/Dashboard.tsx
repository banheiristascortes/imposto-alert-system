import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardCard } from "./DashboardCard";
import { TimelineItem } from "./TimelineItem";
import { FilterBar } from "./FilterBar";

const mockData = [
  { estado: "SP", alteracoes: 12 },
  { estado: "RJ", alteracoes: 8 },
  { estado: "MG", alteracoes: 6 },
  { estado: "RS", alteracoes: 5 },
  { estado: "PR", alteracoes: 4 },
];

const recentChanges = [
  {
    id: 1,
    estado: "São Paulo",
    tipo: "ICMS",
    descricao: "Alteração na alíquota de ICMS para serviços de dados",
    data: "2024-03-15",
  },
  {
    id: 2,
    estado: "Rio de Janeiro",
    tipo: "ICMS",
    descricao: "Novo convênio para tributação de serviços OTT",
    data: "2024-03-10",
  },
  {
    id: 3,
    estado: "Minas Gerais",
    tipo: "ICMS",
    descricao: "Mudança no cálculo da base de ICMS para planos corporativos",
    data: "2024-03-05",
  },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Buscando por:", term);
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo preparados para download.",
    });
    console.log("Exportando dados...");
  };

  const filteredChanges = recentChanges.filter(
    (change) =>
      change.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Fiscal</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <FilterBar onSearch={handleSearch} onExport={handleExport} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total de Alterações"
            value="35"
            tooltip="Número total de alterações fiscais registradas no sistema"
          />
          <DashboardCard
            title="Estados Afetados"
            value="15"
            tooltip="Quantidade de estados com alterações fiscais ativas"
          />
          <DashboardCard
            title="Alterações Pendentes"
            value="8"
            tooltip="Alterações que entrarão em vigor nos próximos 30 dias"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alterações Recentes</h3>
            <div className="space-y-4">
              {filteredChanges.map((change) => (
                <TimelineItem key={change.id} {...change} />
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};