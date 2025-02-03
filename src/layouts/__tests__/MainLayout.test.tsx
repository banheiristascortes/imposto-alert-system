import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from '../MainLayout';
import '@testing-library/jest-dom';

describe('MainLayout', () => {
  it('renders main layout with children', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders sidebar', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      </BrowserRouter>
    );

    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });
});