import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FilterBar } from "./FilterBar";
import { BrazilMap } from "./BrazilMap";
import { AdvancedFilters } from "./AdvancedFilters";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardStats } from "./dashboard/DashboardStats";
import { StateChangesChart } from "./dashboard/StateChangesChart";
import { TrendChart } from "./dashboard/TrendChart";
import { RecentChangesTable } from "./dashboard/RecentChangesTable";

const ITEMS_PER_PAGE = 3;

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

export const Dashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    startDate: undefined,
    endDate: undefined,
    type: "all",
  });

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

    const matchesType = filters.type === "all" || change.tipo === filters.type;

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
      <DashboardHeader />

      <main className="container mx-auto py-8 px-4" id="dashboard-content">
        <FilterBar onSearch={handleSearch} onExport={handleExport} />
        <AdvancedFilters onFilterChange={handleFilterChange} />

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StateChangesChart />
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa de Alterações</h3>
            <BrazilMap />
          </div>
        </div>

        <TrendChart />

        <RecentChangesTable
          changes={paginatedChanges}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};