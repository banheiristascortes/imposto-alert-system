import { render, screen, waitFor } from '@testing-library/react';
import { ComparativeAnalysis } from '../ComparativeAnalysis';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

// Mock the recharts library
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: ({ dataKey }: { dataKey: string }) => <div data-testid={`line-${dataKey}`} />,
  XAxis: ({ dataKey }: { dataKey: string }) => <div data-testid={`x-axis-${dataKey}`} />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />
}));

jest.mock('@/services/api', () => ({
  api: {
    getComparativeData: jest.fn()
  }
}));

describe('ComparativeAnalysis', () => {
  const mockData = [
    { mes: 'Jan', SP: 100, RJ: 90, MG: 80 },
    { mes: 'Fev', SP: 110, RJ: 95, MG: 85 }
  ];

  beforeEach(() => {
    (api.getComparativeData as jest.Mock).mockReset();
  });

  it('renders comparative analysis chart', async () => {
    (api.getComparativeData as jest.Mock).mockResolvedValue(mockData);
    render(<ComparativeAnalysis />);
    
    expect(screen.getByText('Análise Comparativa entre Estados')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
      expect(screen.getByTestId('line-SP')).toBeInTheDocument();
      expect(screen.getByTestId('line-RJ')).toBeInTheDocument();
      expect(screen.getByTestId('line-MG')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    (api.getComparativeData as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<ComparativeAnalysis />);
    
    await waitFor(() => {
      expect(screen.getByText('Análise Comparativa entre Estados')).toBeInTheDocument();
    });
  });
});