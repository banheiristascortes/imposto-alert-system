import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserProfile } from '../UserProfile';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getUserByEmail: jest.fn(),
  },
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('UserProfile', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatar.jpg',
    preferences: {
      emailNotifications: true,
      darkMode: false,
    },
  };

  const mockToast = jest.fn();

  beforeEach(() => {
    localStorage.setItem('currentUserEmail', 'john@example.com');
    (api.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders user profile with data', async () => {
    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    });
  });

  it('handles save profile', async () => {
    render(<UserProfile />);

    const saveButton = screen.getByText('Salvar Alterações');
    fireEvent.click(saveButton);

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Perfil atualizado',
      description: 'Suas informações foram salvas com sucesso.',
    });
  });

  it('handles missing user session', async () => {
    localStorage.clear();
    render(<UserProfile />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Erro',
        description: 'Sessão expirada. Por favor, faça login novamente.',
        variant: 'destructive',
      });
    });
  });
});