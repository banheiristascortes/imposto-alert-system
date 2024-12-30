import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Fiscal</h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total de Alterações</h3>
            <p className="text-3xl font-bold text-primary-500">35</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Estados Afetados</h3>
            <p className="text-3xl font-bold text-primary-500">15</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Alterações Pendentes</h3>
            <p className="text-3xl font-bold text-primary-500">8</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alterações por Estado</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="estado" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="alteracoes" fill="#1E3A8A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alterações Recentes</h3>
            <div className="space-y-4">
              {recentChanges.map((change) => (
                <div
                  key={change.id}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-500">
                        {change.estado} - {change.tipo}
                      </h4>
                      <p className="text-sm text-gray-600">{change.descricao}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(change.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};