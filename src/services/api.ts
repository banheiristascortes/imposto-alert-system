import { mockNotifications } from './api/mockData/notifications';
import { mockTaxChanges } from './api/mockData/taxChanges';
import { mockStateData } from './api/mockData/stateData';
import { mockTrendData } from './api/mockData/trendData';
import { mockComparativeData } from './api/mockData/comparativeData';
import { API_BASE_URL } from "@/constants/app";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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