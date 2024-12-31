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
  LineChart,
  Line,
} from "recharts";
import { DashboardCard } from "./DashboardCard";
import { TimelineItem } from "./TimelineItem";
import { FilterBar } from "./FilterBar";
import { BrazilMap } from "./BrazilMap";
import { AdvancedFilters } from "./AdvancedFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockData = [
  { estado: "SP", alteracoes: 12, coordinates: [-48.5483, -22.9099] as [number, number] },
  { estado: "RJ", alteracoes: 8, coordinates: [-43.1729, -22.9068] as [number, number] },
  { estado: "MG", alteracoes: 6, coordinates: [-44.0383, -19.9167] as [number, number] },
  { estado: "RS", alteracoes: 5, coordinates: [-51.2177, -30.0346] as [number, number] },
  { estado: "PR", alteracoes: 4, coordinates: [-51.4166, -25.4284] as [number, number] },
];

const trendData = [
  { mes: "Jan", alteracoes: 5 },
  { mes: "Fev", alteracoes: 7 },
  { mes: "Mar", alteracoes: 12 },
  { mes: "Abr", alteracoes: 8 },
  { mes: "Mai", alteracoes: 15 },
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

const ITEMS_PER_PAGE = 3;

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: undefined,
    endDate: undefined,
    tipo: "todos",
  });

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo preparados para download.",
    });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredChanges = recentChanges.filter((change) => {
    const matchesSearch =
      change.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.descricao.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filters.tipo === "todos" || change.tipo === filters.tipo;

    const changeDate = new Date(change.data);
    const matchesDateRange =
      (!filters.startDate || changeDate >= filters.startDate) &&
      (!filters.endDate || changeDate <= filters.endDate);

    return matchesSearch && matchesType && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredChanges.length / ITEMS_PER_PAGE);
  const paginatedChanges = filteredChanges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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
        <AdvancedFilters onFilterChange={handleFilterChange} />

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
            <h3 className="text-lg font-semibold mb-4">Tendência de Alterações</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
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
                  <Line
                    type="monotone"
                    dataKey="alteracoes"
                    stroke="#1E3A8A"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Mapa de Alterações</h3>
            <BrazilMap stateData={mockData} />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Alterações Recentes</h3>
            <div className="space-y-4">
              {paginatedChanges.map((change) => (
                <TimelineItem key={change.id} {...change} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};
