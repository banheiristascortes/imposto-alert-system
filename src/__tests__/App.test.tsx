import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';
import '@testing-library/jest-dom';

const queryClient = new QueryClient();

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Sistema de Acompanhamento Fiscal')).toBeInTheDocument();
  });

  it('renders login page by default', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});