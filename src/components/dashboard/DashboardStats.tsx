import { useEffect, useState } from "react";
import { DashboardCard } from "../DashboardCard";
import { api } from "@/services/api";

interface DashboardStatsData {
  totalChanges: number;
  affectedStates: number;
  pendingChanges: number;
  financialImpact: string;
}

export const DashboardStats = () => {
  const [stats, setStats] = useState<DashboardStatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await api.getDashboardStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard
        title="Total de Alterações"
        value={stats.totalChanges}
        tooltip="Número total de alterações fiscais registradas no sistema"
      />
      <DashboardCard
        title="Estados Afetados"
        value={stats.affectedStates}
        tooltip="Quantidade de estados com alterações fiscais ativas"
      />
      <DashboardCard
        title="Alterações Pendentes"
        value={stats.pendingChanges}
        tooltip="Alterações que entrarão em vigor nos próximos 30 dias"
      />
      <DashboardCard
        title="Impacto Financeiro"
        value={`R$ ${stats.financialImpact}`}
        tooltip="Estimativa de impacto financeiro das alterações recentes"
      />
    </div>
  );
};