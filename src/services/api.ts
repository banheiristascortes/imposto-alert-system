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
    return mockData.recentChanges.data;
  },

  async getStateData() {
    await delay(500);
    return mockData.stateData.data;
  },

  async getTrendData() {
    await delay(500);
    return mockData.trendData.data;
  },

  async getComparativeData() {
    await delay(500);
    return mockData.comparativeData.data;
  },

  async getDashboardStats() {
    await delay(500);
    return mockData.dashboardStats.data;
  },

  async getStateChangesData() {
    await delay(500);
    return mockData.stateChangesData.data;
  },

  async getTrendChartData() {
    await delay(500);
    return mockData.trendChartData.data;
  },

  async getComments(changeId: number) {
    await delay(500);
    const change = mockData.recentChanges.data.find(c => c.id === changeId);
    return change?.comentarios || [];
  }
};