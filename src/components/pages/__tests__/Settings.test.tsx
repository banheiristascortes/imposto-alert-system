import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Settings } from '../Settings';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

jest.mock('@/contexts/ThemeContext');
jest.mock('@/hooks/use-toast');
const mockUseTheme = useTheme as jest.Mock;
const mockUseToast = useToast as jest.Mock;

describe('Página de Configurações', () => {
  const mockToggleTheme = jest.fn();
  const mockToast = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });
    mockUseToast.mockReturnValue({
      toast: mockToast
    });
  });
  
  it('deve renderizar todas as seções principais', () => {
    render(<Settings />);
    
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Aparência')).toBeInTheDocument();
    expect(screen.getByText('Notificações')).toBeInTheDocument();
    expect(screen.getByText('Notificações Push')).toBeInTheDocument();
    expect(screen.getByText('Notificações por Email')).toBeInTheDocument();
    expect(screen.getByText('Salvar Alterações')).toBeInTheDocument();
  });
  
  it('deve alternar o tema quando o switch de tema for clicado', async () => {
    render(<Settings />);
    
    const switchDeTema = screen.getByRole('switch', { name: /Modo Escuro/i });
    await userEvent.click(switchDeTema);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
  
  it('deve mostrar notificação de toast ao salvar alterações', async () => {
    render(<Settings />);
    
    const botaoSalvar = screen.getByText('Salvar Alterações');
    await userEvent.click(botaoSalvar);
    
    expect(mockToast).toHaveBeenCalledWith({
      title: 'Configurações salvas',
      description: 'Suas preferências foram atualizadas com sucesso.'
    });
  });
  
  it('deve ter os estados corretos por padrão para os switches de notificação', () => {
    render(<Settings />);
    
    const switchNotificacaoPush = screen.getByRole('switch', { name: /Notificações Push/i });
    const switchNotificacaoEmail = screen.getByRole('switch', { name: /Notificações por Email/i });
    
    expect(switchNotificacaoPush).toBeChecked();
    expect(switchNotificacaoEmail).toBeChecked();
  });
});
