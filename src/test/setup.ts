import '@testing-library/jest-dom';

// Mock TextEncoder/TextDecoder
Object.assign(global, {
  TextEncoder: require('util').TextEncoder,
  TextDecoder: require('util').TextDecoder,
});