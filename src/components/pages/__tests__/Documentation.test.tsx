import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Documentation from '../Documentation';
import '@testing-library/jest-dom';

describe('Página de Documentação', () => {
  it('deve renderizar o título da página', () => {
    render(<Documentation />);
    
    expect(screen.getByText('Documentação')).toBeInTheDocument();
  });

  it('deve renderizar todas as abas principais', () => {
    render(<Documentation />);
    
    expect(screen.getByText('Começando')).toBeInTheDocument();
    expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Suporte')).toBeInTheDocument();
  });

  it('deve exibir o conteúdo correto ao selecionar a aba "Começando"', async () => {
    render(<Documentation />);
    
    const tabComecando = screen.getByText('Começando');
    await userEvent.click(tabComecando);
    
    expect(screen.getByText('Primeiros Passos')).toBeInTheDocument();
    expect(screen.getByText('1. Configuração Inicial')).toBeInTheDocument();
    expect(screen.getByText('2. Navegação')).toBeInTheDocument();
    expect(screen.getByText('3. Personalização')).toBeInTheDocument();
  });

  it('deve exibir o conteúdo correto ao selecionar a aba "Funcionalidades"', async () => {
    render(<Documentation />);
    
    const tabFuncionalidades = screen.getByText('Funcionalidades');
    await userEvent.click(tabFuncionalidades);
    
    expect(screen.getByText('Dashboard interativo com visualização de dados')).toBeInTheDocument();
    expect(screen.getByText('Notificações em tempo real sobre alterações fiscais')).toBeInTheDocument();
    expect(screen.getByText('Relatórios detalhados e exportáveis')).toBeInTheDocument();
  });

  it('deve exibir o conteúdo correto ao selecionar a aba "FAQ"', async () => {
    render(<Documentation />);
    
    const tabFAQ = screen.getByText('FAQ');
    await userEvent.click(tabFAQ);
    
    expect(screen.getByText('Como faço para resetar minha senha?')).toBeInTheDocument();
    expect(screen.getByText('Como posso alterar minhas preferências de notificação?')).toBeInTheDocument();
  });

  it('deve exibir o conteúdo correto ao selecionar a aba "Suporte"', async () => {
    render(<Documentation />);
    
    const tabSuporte = screen.getByText('Suporte');
    await userEvent.click(tabSuporte);
    
    expect(screen.getByText('Contato')).toBeInTheDocument();
    expect(screen.getByText('Telefone: (11) 1234-5678')).toBeInTheDocument();
  });
});
