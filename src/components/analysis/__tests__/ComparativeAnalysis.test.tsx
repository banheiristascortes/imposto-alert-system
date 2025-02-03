import { render, screen } from '@testing-library/react';
import { ComparativeAnalysis } from '../ComparativeAnalysis';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getComparativeData: jest.fn(),
  },
}));

jest.mock('recharts', () => ({
  BarChart: () => <div data-testid="bar-chart">Bar Chart</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => children,
}));

describe('ComparativeAnalysis', () => {
  const mockData = [
    { estado: 'SP', atual: 100, anterior: 80 },
    { estado: 'RJ', atual: 90, anterior: 70 },
  ];

  beforeEach(() => {
    (api.getComparativeData as jest.Mock).mockResolvedValue(mockData);
  });

  it('renders comparative analysis chart', async () => {
    render(<ComparativeAnalysis />);
    
    expect(screen.getByText('Análise Comparativa')).toBeInTheDocument();
    expect(await screen.findByTestId('bar-chart')).toBeInTheDocument();
  });

  it('handles API error gracefully', async () => {
    (api.getComparativeData as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<ComparativeAnalysis />);
    
    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
  });
});