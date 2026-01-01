import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchRiskTrend = (window) =>
  axios.get(`${API_BASE}/api/transactions/risk-trend`, {
    params: { window }
  });

export const fetchRiskDistribution = (window) =>
  axios.get(`${API_BASE}/api/transactions/risk-distribution`, {
    params: { window }
  });

export const fetchLocationStats = (window) =>
  axios.get(`${API_BASE}/api/transactions/location-stats`, {
    params: { window }
  });

