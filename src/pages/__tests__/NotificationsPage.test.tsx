import { render, screen } from '@testing-library/react';
import { NotificationsPage } from '../NotificationsPage';
import '@testing-library/jest-dom';

// Mock the NotificationsComponent
jest.mock('@/components/NotificationsPage', () => ({
  NotificationsPage: () => <div data-testid="notifications">Notifications Component</div>
}));

describe('NotificationsPage', () => {
  it('renders the Notifications component', () => {
    render(<NotificationsPage />);
    expect(screen.getByTestId('notifications')).toBeInTheDocument();
  });
});