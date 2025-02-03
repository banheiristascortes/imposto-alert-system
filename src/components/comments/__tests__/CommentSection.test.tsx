import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CommentSection } from '../CommentSection';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getComments: jest.fn(),
  },
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('CommentSection', () => {
  const mockComments = [
    { id: 1, user: 'User 1', text: 'Comment 1', date: '2024-03-15' },
    { id: 2, user: 'User 2', text: 'Comment 2', date: '2024-03-14' },
  ];

  const mockToast = jest.fn();

  beforeEach(() => {
    (api.getComments as jest.Mock).mockResolvedValue(mockComments);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it('renders comments correctly', async () => {
    render(<CommentSection />);

    await waitFor(() => {
      expect(screen.getByText('Comment 1')).toBeInTheDocument();
      expect(screen.getByText('Comment 2')).toBeInTheDocument();
    });
  });

  it('adds a new comment', async () => {
    render(<CommentSection />);

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText('Adicione seu comentário...');
      const button = screen.getByText('Comentar');

      fireEvent.change(textarea, { target: { value: 'New comment' } });
      fireEvent.click(button);

      expect(mockToast).toHaveBeenCalledWith({
        title: 'Comentário adicionado',
        description: 'Seu comentário foi publicado com sucesso.',
      });
    });
  });

  it('handles API error gracefully', async () => {
    (api.getComments as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<CommentSection />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Erro',
        description: 'Não foi possível carregar os comentários',
        variant: 'destructive',
      });
    });
  });
});