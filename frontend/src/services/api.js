import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchRiskTrend = () =>
  axios.get(`${API_BASE}/api/transactions/risk-trend`);

export const fetchRiskDistribution = () =>
  axios.get(`${API_BASE}/api/transactions/risk-distribution`);

export const fetchLocationStats = () =>
  axios.get(`${API_BASE}/api/transactions/location-stats`);
