import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import RiskTrendChart from "../components/RiskTrendChart";
import RiskDistributionChart from "../components/RiskDistributionChart";
import LocationStatsChart from "../components/LocationStatsChart";

const Dashboard = () => {
  useSocket();

  const transactions = useSelector(
    (state) => state.transactions.list
  );

  const highRiskTransactions = useSelector(
    (state) => state.transactions.highRisk
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 tracking-wide">
        Real-Time Fraud Detection Dashboard
      </h1>

      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Risk Trend
          </h3>
          <RiskTrendChart />
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Risk Distribution
          </h3>
          <RiskDistributionChart />
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Fraud by Location
          </h3>
          <LocationStatsChart />
        </div>
      </div>

      {/* HIGH RISK ALERTS */}
      <div className="glass rounded-xl p-4 mb-8">
        <h2 className="text-lg font-semibold text-red-400 mb-3">
           High Risk Alerts
        </h2>

        {highRiskTransactions.length === 0 ? (
          <p className="text-gray-400">
            No high-risk transactions detected.
          </p>
        ) : (
          <ul className="space-y-2">
            {highRiskTransactions.map((tx) => (
              <li
                key={tx.transactionId}
                className="flex justify-between items-center bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"
              >
                <span className="font-medium">
                  {tx.transactionId}
                </span>
                <span className="text-red-300">
                  ₹{tx.amount} — {tx.location}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">
          Live Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-300 border-b border-white/20">
                <th className="py-2 px-2">#</th>
                <th className="py-2 px-2">Transaction ID</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Location</th>
                <th className="py-2 px-2">Device</th>
                <th className="py-2 px-2">Risk</th>
                <th className="py-2 px-2">Level</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.transactionId}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-2 px-2">{index + 1}</td>
                  <td className="py-2 px-2">{tx.transactionId}</td>
                  <td className="py-2 px-2">₹{tx.amount}</td>
                  <td className="py-2 px-2">{tx.location}</td>
                  <td className="py-2 px-2">{tx.device}</td>
                  <td className="py-2 px-2">{tx.riskScore}</td>
                  <td className="py-2 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.riskLevel === "HIGH"
                          ? "bg-red-500/20 text-red-400"
                          : tx.riskLevel === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {tx.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
