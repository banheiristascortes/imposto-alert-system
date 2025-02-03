import { render, screen, fireEvent } from '@testing-library/react';
import { CommentSection } from '../CommentSection';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getComments: jest.fn(),
    addComment: jest.fn(),
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

    expect(await screen.findByText('Comment 1')).toBeInTheDocument();
    expect(await screen.findByText('Comment 2')).toBeInTheDocument();
  });

  it('handles new comment submission', async () => {
    render(<CommentSection />);

    const input = screen.getByPlaceholderText('Adicione seu comentário...');
    const submitButton = screen.getByText('Comentar');

    fireEvent.change(input, { target: { value: 'New comment' } });
    fireEvent.click(submitButton);

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Comentário adicionado',
    }));
  });

  it('handles API error gracefully', async () => {
    (api.getComments as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<CommentSection />);

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Erro',
      variant: 'destructive',
    }));
  });
});