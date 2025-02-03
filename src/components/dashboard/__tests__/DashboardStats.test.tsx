import { render, screen, waitFor } from '@testing-library/react';
import { DashboardStats } from '../DashboardStats';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getDashboardStats: jest.fn(),
  },
}));

describe('DashboardStats', () => {
  const mockStats = {
    totalChanges: 150,
    affectedStates: 27,
    pendingChanges: 15,
    financialImpact: '1.500.000,00',
  };

  beforeEach(() => {
    (api.getDashboardStats as jest.Mock).mockResolvedValue(mockStats);
  });

  it('renders dashboard stats correctly', async () => {
    render(<DashboardStats />);

    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('27')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('R$ 1.500.000,00')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    (api.getDashboardStats as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<DashboardStats />);
    
    // Component should return null when there's an error
    await waitFor(() => {
      expect(screen.queryByText('Total de Alterações')).not.toBeInTheDocument();
    });
  });
});