// Static datasets for realistic randomness
const locations = [
  { country: "IN", risk: 10 },
  { country: "US", risk: 15 },
  { country: "BR", risk: 25 },
  { country: "RU", risk: 40 },
  { country: "NG", risk: 50 }
];

const devices = ["Android", "iOS", "Web", "Unknown"];

// Utility: random element from array
const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

// Utility: random transaction amount
const randomAmount = () =>
  Math.floor(Math.random() * 10000) + 100;

// Generate a single dummy transaction
export const generateTransaction = () => {
  const location = randomFromArray(locations);

  return {
    transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    amount: randomAmount(),
    location: location.country,
    locationRisk: location.risk,
    device: randomFromArray(devices),
    timestamp: new Date()
  };
};

// Start continuous transaction stream
export const startTransactionStream = (onTransaction) => {
  setInterval(() => {
    const transaction = generateTransaction();
    onTransaction(transaction);
  }, 50000);
};
