import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import FAQ from '../FAQ';
import '@testing-library/jest-dom';

describe('Página de FAQ', () => {
  it('deve renderizar a página de FAQ', () => {
    render(<FAQ />);
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument();
  });

  it('deve renderizar todos os itens de FAQ', () => {
    render(<FAQ />);
    expect(screen.getByText('Como o sistema monitora alterações fiscais?')).toBeInTheDocument();
    expect(screen.getByText('Como exportar relatórios?')).toBeInTheDocument();
    expect(screen.getByText('Como filtrar alterações por estado?')).toBeInTheDocument();
    expect(screen.getByText('Como atualizar minhas preferências de notificação?')).toBeInTheDocument();
  });

  it('deve expandir e colapsar os itens de FAQ', async () => {
    render(<FAQ />);
    const faqItemTrigger = screen.getByText('Como o sistema monitora alterações fiscais?');
    expect(faqItemTrigger).toBeInTheDocument();
    
    await userEvent.click(faqItemTrigger);
    expect(screen.getByText('O sistema monitora automaticamente alterações fiscais e envia notificações em tempo real sobre mudanças relevantes para o seu negócio.')).toBeInTheDocument();
    
    await userEvent.click(faqItemTrigger);
    expect(screen.queryByText('O sistema monitora automaticamente alterações fiscais e envia notificações em tempo real sobre mudanças relevantes para o seu negócio.')).not.toBeInTheDocument();
  });
});
