import { DashboardHeader } from "./dashboard/DashboardHeader";
import { DashboardLayout } from "./dashboard/DashboardLayout";
import { useDashboardData } from "./dashboard/useDashboardData";

export const Dashboard = () => {
  const {
    handleSearch,
    handleExport,
    handleFilterChange,
    paginatedChanges,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useDashboardData();

  return (
    <>
      <DashboardHeader />
      <DashboardLayout
        onSearch={handleSearch}
        onExport={handleExport}
        onFilterChange={handleFilterChange}
        paginatedChanges={paginatedChanges}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};