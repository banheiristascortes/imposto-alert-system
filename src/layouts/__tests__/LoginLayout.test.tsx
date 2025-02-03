import { render, screen } from '@testing-library/react';
import { LoginLayout } from '../LoginLayout';
import '@testing-library/jest-dom';

describe('LoginLayout', () => {
  it('renders login layout with children', () => {
    render(
      <LoginLayout>
        <div>Login Content</div>
      </LoginLayout>
    );

    expect(screen.getByText('Login Content')).toBeInTheDocument();
  });
});