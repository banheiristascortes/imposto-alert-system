import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NotificationBell } from "./NotificationBell";
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
  Legend,
} from "recharts";
import { DashboardCard } from "./DashboardCard";
import { TimelineItem } from "./TimelineItem";
import { FilterBar } from "./FilterBar";
import { BrazilMap } from "./BrazilMap";
import { AdvancedFilters } from "./AdvancedFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const mockData = [
  { estado: "SP", alteracoes: 12 },
  { estado: "RJ", alteracoes: 8 },
  { estado: "MG", alteracoes: 6 },
  { estado: "RS", alteracoes: 5 },
  { estado: "PR", alteracoes: 4 },
];

const trendData = [
  { mes: "Jan", icms: 4, iss: 2, outros: 1 },
  { mes: "Fev", icms: 6, iss: 3, outros: 2 },
  { mes: "Mar", icms: 8, iss: 4, outros: 3 },
  { mes: "Abr", icms: 5, iss: 2, outros: 2 },
  { mes: "Mai", icms: 7, iss: 3, outros: 1 },
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
  {
    id: 4,
    estado: "Rio Grande do Sul",
    tipo: "ISS",
    descricao: "Atualização na tributação de serviços digitais",
    data: "2024-03-01",
  },
  {
    id: 5,
    estado: "Paraná",
    tipo: "PIS/COFINS",
    descricao: "Novas regras para créditos tributários",
    data: "2024-02-28",
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
    type: "all",
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
      filters.type === "all" || change.tipo === filters.type;

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
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
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
            <h3 className="text-lg font-semibold mb-4">Mapa de Alterações</h3>
            <BrazilMap />
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">
            Tendência de Alterações por Tipo
          </h3>
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Alterações Recentes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedChanges.map((change) => (
                <TableRow key={change.id}>
                  <TableCell>{change.estado}</TableCell>
                  <TableCell>{change.tipo}</TableCell>
                  <TableCell>{change.descricao}</TableCell>
                  <TableCell>
                    {new Date(change.data).toLocaleDateString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.max(1, p - 1));
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === currentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};
