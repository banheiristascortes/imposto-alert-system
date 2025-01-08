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
  async getStateData() {
    await delay(500);
    return mockData.mapStateChanges;
  },

  async getComparativeData() {
    await delay(500);
    return mockData.stateComparisonChart;
  },

  async getTrendData() {
    await delay(500);
    return mockData.trendForecastChart;
  },

  async getTrendChartData() {
    await delay(500);
    return mockData.monthlyTaxTypeChart;
  },

  async getStateChangesData() {
    await delay(500);
    return mockData.recentChangesTable;
  },

  async getDashboardStats() {
    await delay(500);
    return mockData.dashboardStatistics;
  },

  async getNotifications() {
    await delay(500);
    return mockData.notifications || [];
  },

  async getRecentChanges() {
    await delay(500);
    return mockData.recentChangesTable;
  },

  async getComments() {
    await delay(500);
    return mockData.comments || [];
  }
};