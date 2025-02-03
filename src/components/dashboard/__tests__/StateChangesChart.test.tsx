import { render, screen, fireEvent } from '@testing-library/react';
import { StateChangesChart } from '../StateChangesChart';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getStateChangesData: jest.fn(),
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

describe('StateChangesChart', () => {
  const mockData = [
    { estado: 'SP', alteracoes: 100, impacto: 'Alto', detalhes: 'Detalhes SP' },
    { estado: 'RJ', alteracoes: 80, impacto: 'Médio', detalhes: 'Detalhes RJ' },
  ];

  beforeEach(() => {
    (api.getStateChangesData as jest.Mock).mockResolvedValue(mockData);
  });

  it('renders state changes chart', async () => {
    render(<StateChangesChart />);
    
    expect(screen.getByText('Alterações por Estado')).toBeInTheDocument();
    expect(await screen.findByTestId('bar-chart')).toBeInTheDocument();
  });

  it('handles zoom controls', async () => {
    render(<StateChangesChart />);
    
    const zoomInButton = screen.getByRole('button', { name: /zoom in/i });
    const zoomOutButton = screen.getByRole('button', { name: /zoom out/i });

    fireEvent.click(zoomInButton);
    fireEvent.click(zoomOutButton);

    expect(await screen.findByTestId('bar-chart')).toBeInTheDocument();
  });
});