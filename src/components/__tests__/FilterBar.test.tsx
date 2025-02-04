import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';
import '@testing-library/jest-dom';

describe('FilterBar', () => {
  const mockOnSearch = jest.fn();
  const mockOnExport = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and export button', () => {
    render(<FilterBar onSearch={mockOnSearch} onExport={mockOnExport} />);
    
    expect(screen.getByPlaceholderText('Buscar alterações...')).toBeInTheDocument();
    expect(screen.getByText('Exportar PDF')).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    render(<FilterBar onSearch={mockOnSearch} onExport={mockOnExport} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar alterações...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});