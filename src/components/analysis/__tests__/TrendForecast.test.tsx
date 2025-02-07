import { render, screen } from '@testing-library/react';
import { TrendForecast } from '../TrendForecast';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getTrendData: jest.fn(),
  },
}));

jest.mock('recharts', () => ({
  AreaChart: () => <div data-testid="area-chart">Area Chart</div>,
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

describe('TrendForecast', () => {
  const mockData = [
    { mes: 'Jan', atual: 100, previsao: 120 },
    { mes: 'Fev', atual: 110, previsao: 130 },
  ];

  beforeEach(() => {
    (api.getTrendData as jest.Mock).mockResolvedValue(mockData);
  });

  it('renders trend forecast chart', async () => {
    render(<TrendForecast />);
    
    expect(screen.getByText('Previsão de Tendências')).toBeInTheDocument();
    expect(await screen.findByTestId('area-chart')).toBeInTheDocument();
  });

  it('handles empty data', async () => {
    (api.getTrendData as jest.Mock).mockResolvedValue([]);
    render(<TrendForecast />);
    
    await screen.findByText('Nenhum dado disponível');
    expect(screen.queryByTestId('area-chart')).not.toBeInTheDocument();
  });
});