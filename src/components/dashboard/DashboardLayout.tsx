import { FilterBar } from "../FilterBar";
import { AdvancedFilters } from "../AdvancedFilters";
import { DashboardStats } from "./DashboardStats";
import { StateChangesChart } from "./StateChangesChart";
import { BrazilMap } from "../BrazilMap";
import { TrendChart } from "./TrendChart";
import { ComparativeAnalysis } from "../analysis/ComparativeAnalysis";
import { TrendForecast } from "../analysis/TrendForecast";
import { RecentChangesTable } from "./RecentChangesTable";
import { CommentSection } from "../comments/CommentSection";

interface DashboardLayoutProps {
  onSearch: (term: string) => void;
  onExport: () => void;
  onFilterChange: (filters: any) => void;
  paginatedChanges: any[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DashboardLayout = ({
  onSearch,
  onExport,
  onFilterChange,
  paginatedChanges,
  currentPage,
  totalPages,
  onPageChange,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4" id="dashboard-content">
        <FilterBar onSearch={onSearch} onExport={onExport} />
        <AdvancedFilters onFilterChange={onFilterChange} />

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StateChangesChart />
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Mapa de Alterações</h3>
            <BrazilMap />
          </div>
        </div>

        <TrendChart />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ComparativeAnalysis />
          <TrendForecast />
        </div>

        <RecentChangesTable
          changes={paginatedChanges}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        <div className="mt-8">
          <CommentSection />
        </div>
      </main>
    </div>
  );
};