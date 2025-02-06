import { renderHook } from '@testing-library/react';
import { useIsMobile } from '../use-mobile';

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;
  let mockMatchMedia: jest.Mock;

  beforeEach(() => {
    mockMatchMedia = jest.fn();
    window.matchMedia = mockMatchMedia;
    window.innerWidth = 1024; // Default to desktop width
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns false for desktop viewport', () => {
    mockMatchMedia.mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('returns true for mobile viewport', () => {
    window.innerWidth = 600; // Set to mobile width
    mockMatchMedia.mockImplementation(() => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });
});