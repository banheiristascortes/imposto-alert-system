import { render, screen, waitFor } from '@testing-library/react';
import { TrendChart } from '../TrendChart';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getTrendChartData: jest.fn(),
  },
}));

jest.mock('recharts', () => ({
  LineChart: () => <div data-testid="line-chart">Line Chart</div>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

describe('TrendChart', () => {
  const mockData = [
    { mes: 'Jan', icms: 100, iss: 50, outros: 25 },
    { mes: 'Fev', icms: 120, iss: 60, outros: 30 },
  ];

  beforeEach(() => {
    (api.getTrendChartData as jest.Mock).mockResolvedValue(mockData);
  });

  it('renders trend chart when data is loaded', async () => {
    render(<TrendChart />);

    await waitFor(() => {
      expect(screen.getByText('Tendência de Alterações por Tipo')).toBeInTheDocument();
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });
  });

  it('handles empty data correctly', async () => {
    (api.getTrendChartData as jest.Mock).mockResolvedValue([]);
    render(<TrendChart />);

    await waitFor(() => {
      expect(screen.queryByText('Tendência de Alterações por Tipo')).not.toBeInTheDocument();
    });
  });
});