import { DashboardCard } from "../DashboardCard";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
      <DashboardCard
        title="Impacto Financeiro"
        value="R$ 1.2M"
        tooltip="Estimativa de impacto financeiro das alterações recentes"
      />
    </div>
  );
};