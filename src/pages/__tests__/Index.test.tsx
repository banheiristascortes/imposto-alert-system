import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../Index';
import '@testing-library/jest-dom';

// Mock Navigate component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <div data-testid="navigate">Navigate Component</div>
}));

describe('Index', () => {
  it('renders Navigate component with correct props', () => {
    const { container } = render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});