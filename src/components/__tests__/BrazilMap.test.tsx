import { render } from '@testing-library/react';
import { BrazilMap } from '../BrazilMap';
import { api } from '@/services/api';
import '@testing-library/jest-dom';

jest.mock('@/services/api', () => ({
  api: {
    getStateData: jest.fn(),
  },
}));

jest.mock('leaflet', () => ({
  map: jest.fn(() => ({
    setView: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
  circleMarker: jest.fn(() => ({
    addTo: jest.fn(),
    bindPopup: jest.fn(),
  })),
}));

describe('BrazilMap', () => {
  const mockStateData = [
    { state: 'SP', changes: 10 },
    { state: 'RJ', changes: 5 },
  ];

  beforeEach(() => {
    (api.getStateData as jest.Mock).mockResolvedValue(mockStateData);
  });

  it('renders without crashing', () => {
    const { container } = render(<BrazilMap />);
    expect(container).toBeInTheDocument();
  });

  it('initializes map with correct dimensions', () => {
    const { container } = render(<BrazilMap />);
    const mapContainer = container.querySelector('.h-[400px]');
    expect(mapContainer).toBeInTheDocument();
  });
});