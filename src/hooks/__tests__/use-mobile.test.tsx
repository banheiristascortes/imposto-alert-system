import { renderHook } from '@testing-library/react';
import { useMobile } from '../use-mobile';

describe('useMobile', () => {
  const originalMatchMedia = window.matchMedia;

  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('returns false for desktop viewport', () => {
    const { result } = renderHook(() => useMobile());
    expect(result.current).toBe(false);
  });

  it('returns true for mobile viewport', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useMobile());
    expect(result.current).toBe(true);
  });
});