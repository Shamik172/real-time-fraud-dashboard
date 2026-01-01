import { useState } from "react" 
import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import RiskTrendChart from "../components/RiskTrendChart";
import RiskDistributionChart from "../components/RiskDistributionChart";
import LocationStatsChart from "../components/LocationStatsChart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const getReasonStyle = (reason) => {
  // Gemini failed / unavailable
  if (reason.startsWith("AI unavailable")) {
    return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }

  // Gemini AI reasons
  if (reason.startsWith("AI")) {
    return "bg-purple-500/20 text-purple-300 border-purple-500/30";
  }

  // Manual / rule-based reasons
  return "bg-orange-500/20 text-orange-300 border-orange-500/30";
};




const AdminDashboard = () => {
  const [timeWindow, setTimeWindow] = useState("overall");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useSocket();

  const transactions = useSelector(
    (state) => state.transactions.list
  );

  const highRiskTransactions = useSelector(
    (state) => state.transactions.highRisk
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8">
  {/* TOP ROW: TITLE + LOGOUT */}
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold tracking-wide">
      Real-Time Fraud Detection Dashboard
    </h1>

    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg 
                 bg-red-500/20 text-red-400 
                 border border-red-500/30 
                 hover:bg-red-500/30 transition"
    >
      Logout
    </button>
  </div>

  {/* SECOND ROW: TIME WINDOW FILTERS */}
  <div className="flex gap-2 flex-wrap">
    {["overall", "1h", "1d", "1w", "1m", "1y"].map((w) => (
      <button
        key={w}
        onClick={() => setTimeWindow(w)}
        className={`px-3 py-1 rounded text-sm font-medium transition ${
          timeWindow === w
            ? "bg-blue-500 text-white"
            : "bg-white/10 text-gray-300 hover:bg-white/20"
        }`}
      >
        {w.toUpperCase()}
      </button>
    ))}
  </div>
</div>



      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Risk Trend
          </h3>
          <RiskTrendChart timeWindow={timeWindow} />
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Risk Distribution
          </h3>
          <RiskDistributionChart timeWindow={timeWindow} />
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="text-sm uppercase text-gray-300 mb-2">
            Fraud by Location
          </h3>
          <LocationStatsChart timeWindow={timeWindow} />
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">
          Live Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            {/* COLUMN WIDTH CONTROL */}
            <colgroup>{[
              <col key="1" className="w-12" />,
              <col key="2" className="w-64" />,
              <col key="3" className="w-24" />,
              <col key="4" className="w-20" />,
              <col key="5" className="w-24" />,
              <col key="6" className="w-20" />,
              <col key="7" className="w-20" />
            ]}</colgroup>


            <thead>
              <tr className="text-gray-300 border-b border-white/20">
                <th className="py-2 px-2 text-left">#</th>
                <th className="py-2 px-2 text-left">Transaction ID</th>
                <th className="py-2 px-2 text-right">Amount</th>
                <th className="py-2 px-2 text-center">Location</th>
                <th className="py-2 px-2 text-center">Device</th>
                <th className="py-2 px-2 text-right">Risk</th>
                <th className="py-2 px-2 text-center">Level</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.transactionId}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-2 px-2 text-left">{index + 1}</td>

                  <td className="py-2 px-2 truncate">
                    {tx.transactionId}
                  </td>

                  <td className="py-2 px-2 text-right font-mono">
                    ₹{tx.amount}
                  </td>

                  <td className="py-2 px-2 text-center">
                    {tx.location}
                  </td>

                  <td className="py-2 px-2 text-center">
                    {tx.device}
                  </td>

                  <td className="py-2 px-2 text-right font-mono">
                    {tx.riskScore}
                  </td>

                  <td className="py-2 px-2 text-center">
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

      {/* HIGH RISK ALERTS */}
      <div className="glass rounded-xl p-4 mb-8">
  <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
    🚨 High Risk Alerts
  </h2>

  {highRiskTransactions.length === 0 ? (
    <p className="text-gray-400">
      No high-risk transactions detected.
    </p>
  ) : (
    <ul className="space-y-3">
      {highRiskTransactions.map((tx) => (
        <li
          key={tx.transactionId}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 space-y-2"
        >
          {/* TOP ROW */}
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-100">
              {tx.transactionId}
            </span>

            <span className="text-red-300 text-sm">
              ₹{tx.amount} • {tx.location}
            </span>
          </div>

          {/* REASONS */}
          <div className="flex flex-wrap gap-2">
            {tx.reasons.map((reason, i) => (
              <span
                key={i}
                className={`text-xs px-2 py-1 rounded-full border ${getReasonStyle(reason)}`}
              >
                {reason}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>


    </div>
  );
};

export default AdminDashboard;
