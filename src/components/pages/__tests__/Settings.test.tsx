import { render, screen, fireEvent } from '@testing-library/react';
import { Settings } from '../Settings';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

jest.mock('@/contexts/ThemeContext');
jest.mock('@/hooks/use-toast');

describe('Settings Page', () => {
  const mockToggleTheme = jest.fn();
  const mockToast = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });

  it('renders settings page correctly', () => {
    render(<Settings />);
    
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Aparência')).toBeInTheDocument();
    expect(screen.getByText('Notificações')).toBeInTheDocument();
  });

  it('handles theme toggle', () => {
    render(<Settings />);
    
    const themeToggle = screen.getByRole('switch', { name: /modo escuro/i });
    fireEvent.click(themeToggle);
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('saves settings successfully', () => {
    render(<Settings />);
    
    const saveButton = screen.getByText('Salvar Alterações');
    fireEvent.click(saveButton);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Configurações salvas',
      description: 'Suas preferências foram atualizadas com sucesso.',
    });
  });
});