import mockData from './api/mockData/mock.json';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  get: async (endpoint: string) => {
    await delay(500);
    const response = await fetch(`${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    await delay(500);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Mock data methods
  async getNotifications() {
    await delay(500);
    return mockData.notifications;
  },

  async getTaxChanges() {
    await delay(500);
    return mockData.taxChanges;
  },

  async getStateData() {
    await delay(500);
    return mockData.stateData;
  },

  async getTrendData() {
    await delay(500);
    return mockData.trendData;
  },

  async getComparativeData() {
    await delay(500);
    return mockData.comparativeData;
  }
};