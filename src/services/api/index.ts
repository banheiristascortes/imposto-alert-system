import { mockNotifications } from './mockData/notifications';
import { mockTaxChanges } from './mockData/taxChanges';
import { mockStateData } from './mockData/stateData';
import { mockTrendData } from './mockData/trendData';
import { mockComparativeData } from './mockData/comparativeData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getNotifications() {
    await delay(500);
    return mockNotifications;
  },

  async getTaxChanges() {
    await delay(500);
    return mockTaxChanges;
  },

  async getStateData() {
    await delay(500);
    return mockStateData;
  },

  async getTrendData() {
    await delay(500);
    return mockTrendData;
  },

  async getComparativeData() {
    await delay(500);
    return mockComparativeData;
  }
};