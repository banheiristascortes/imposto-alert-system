import { render, screen } from '@testing-library/react';
import { DashboardLayout } from '../DashboardLayout';
import '@testing-library/jest-dom';

jest.mock('../../FilterBar', () => ({
  FilterBar: () => <div data-testid="filter-bar">Filter Bar</div>,
}));

jest.mock('../../AdvancedFilters', () => ({
  AdvancedFilters: () => <div data-testid="advanced-filters">Advanced Filters</div>,
}));

jest.mock('../DashboardStats', () => ({
  DashboardStats: () => <div data-testid="dashboard-stats">Dashboard Stats</div>,
}));

jest.mock('../StateChangesChart', () => ({
  StateChangesChart: () => <div data-testid="state-changes-chart">State Changes Chart</div>,
}));

jest.mock('../../BrazilMap', () => ({
  BrazilMap: () => <div data-testid="brazil-map">Brazil Map</div>,
}));

describe('DashboardLayout', () => {
  const mockProps = {
    onSearch: jest.fn(),
    onExport: jest.fn(),
    onFilterChange: jest.fn(),
    paginatedChanges: [],
    currentPage: 1,
    totalPages: 1,
    onPageChange: jest.fn(),
  };

  it('renders all main components', () => {
    render(<DashboardLayout {...mockProps} />);

    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('advanced-filters')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-stats')).toBeInTheDocument();
    expect(screen.getByTestId('state-changes-chart')).toBeInTheDocument();
    expect(screen.getByTestId('brazil-map')).toBeInTheDocument();
  });

  it('renders with the correct layout structure', () => {
    render(<DashboardLayout {...mockProps} />);
    
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toHaveClass('container mx-auto py-8 px-4');
  });
});