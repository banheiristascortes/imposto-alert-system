import { render, screen, fireEvent } from '@testing-library/react';
import { RecentChangesTable } from '../RecentChangesTable';
import '@testing-library/jest-dom';

describe('RecentChangesTable', () => {
  const mockChanges = [
    {
      id: 1,
      estado: 'São Paulo',
      tipo: 'ICMS',
      descricao: 'Alteração na alíquota',
      data: '2024-03-15',
    },
    {
      id: 2,
      estado: 'Rio de Janeiro',
      tipo: 'ISS',
      descricao: 'Nova regulamentação',
      data: '2024-03-14',
    },
  ];

  const mockProps = {
    changes: mockChanges,
    currentPage: 1,
    totalPages: 2,
    onPageChange: jest.fn(),
  };

  it('renders table with correct data', () => {
    render(<RecentChangesTable {...mockProps} />);

    expect(screen.getByText('São Paulo')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    expect(screen.getByText('ICMS')).toBeInTheDocument();
    expect(screen.getByText('ISS')).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    render(<RecentChangesTable {...mockProps} />);

    const nextButton = screen.getByRole('link', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it('formats dates correctly', () => {
    render(<RecentChangesTable {...mockProps} />);

    expect(screen.getByText('15/03/2024')).toBeInTheDocument();
    expect(screen.getByText('14/03/2024')).toBeInTheDocument();
  });

  it('renders pagination when there are multiple pages', () => {
    render(<RecentChangesTable {...mockProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});