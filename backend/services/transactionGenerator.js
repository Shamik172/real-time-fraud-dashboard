// // Static datasets for realistic randomness
// const locations = [
//   { country: "IN", risk: 10 },
//   { country: "US", risk: 15 },
//   { country: "BR", risk: 25 },
//   { country: "RU", risk: 40 },
//   { country: "NG", risk: 50 }
// ];

// const devices = ["Android", "iOS", "Web", "Unknown"];

// // Utility: random element from array
// const randomFromArray = (arr) =>
//   arr[Math.floor(Math.random() * arr.length)];

// // Utility: random transaction amount
// const randomAmount = () =>
//   Math.floor(Math.random() * 50000) + 100;

// // Generate a single dummy transaction
// export const generateTransaction = () => {
//   const location = randomFromArray(locations);

//   return {
//     transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
//     amount: randomAmount(),
//     location: location.country,
//     locationRisk: location.risk,
//     device: randomFromArray(devices),
//     timestamp: new Date()
//   };
// };

// // Start continuous transaction stream
// export const startTransactionStream = (onTransaction) => {
//   setInterval(() => {
//     const transaction = generateTransaction();
//     onTransaction(transaction);
//   }, 500000);
// };




const devices = ["Android", "iOS", "Web", "Unknown"];

const locationRiskMap = {
  IN: 10,
  US: 15,
  BR: 25,
  RU: 40,
  NG: 50
};

const randomFromArray = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomAmount = () =>
  Math.floor(Math.random() * 50000) + 100;

export const generateUserTransaction = (user) => ({
  transactionId: `TXN_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
  userId: user._id,

  amount: randomAmount(),

  location: user.location,
  locationRisk: locationRiskMap[user.location] ?? 10,

  device: randomFromArray(devices),
  timestamp: new Date()
});


