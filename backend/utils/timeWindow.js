export const getTimeFilter = (window) => {
  const now = Date.now();

  switch (window) {
    case "1h":
      return new Date(now - 60 * 60 * 1000);
    case "1d":
      return new Date(now - 24 * 60 * 60 * 1000);
    case "1w":
      return new Date(now - 7 * 24 * 60 * 60 * 1000);
    case "1m":
      return new Date(now - 30 * 24 * 60 * 60 * 1000);
    case "1y":
      return new Date(now - 365 * 24 * 60 * 60 * 1000);
    default:
      return null; // overall
  }
};
