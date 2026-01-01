import api from "./api";

export const fetchRiskTrend = (window) =>
  api.get("/transactions/risk-trend", {
    params: { window }
  });

export const fetchRiskDistribution = (window) =>
  api.get("/transactions/risk-distribution", {
    params: { window }
  });

export const fetchLocationStats = (window) =>
  api.get("/transactions/location-stats", {
    params: { window }
  });
