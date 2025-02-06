import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../DashboardPage';
import '@testing-library/jest-dom';

// Mock the Dashboard component since we're only testing the page wrapper
jest.mock('@/components/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard">Dashboard Component</div>
}));

describe('DashboardPage', () => {
  it('renders the Dashboard component', () => {
    render(<DashboardPage />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});