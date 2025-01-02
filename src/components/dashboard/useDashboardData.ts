import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

export const useDashboardData = () => {
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

  return {
    handleSearch,
    handleExport,
    handleFilterChange,
    paginatedChanges,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};