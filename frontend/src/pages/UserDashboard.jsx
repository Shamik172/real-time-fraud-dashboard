import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useSocket } from "../hooks/useSocket";
import {
  fetchMyTransactions,
  generateUserTransaction
} from "../services/userApi";

import {
  setMyTransactions
} from "../features/transactionSlice";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Initialize socket (real-time updates)
  useSocket();

  // User-specific transactions
  const myTransactions = useSelector(
    (state) => state.transactions.myList
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fetch user's past transactions on page load
  useEffect(() => {
    const loadMyTransactions = async () => {
      try {
        const res = await fetchMyTransactions();
        dispatch(setMyTransactions(res.data));
      } catch (err) {
        console.error("Failed to load transactions", err);
      }
    };

    loadMyTransactions();
  }, [dispatch]);

  // Generate new transaction
  const handleGenerate = async () => {
    try {
      await generateUserTransaction();
      // socket will update Redux automatically
    } catch (err) {
      console.error("Transaction generation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    My Transactions
  </h1>

  <button
    onClick={handleLogout}
    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 
               border border-red-500/30 hover:bg-red-500/30 transition"
  >
    Logout
  </button>
</div>


      {/* ACTION CARD */}
      <div className="glass rounded-xl p-4 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            Generate Transaction
          </h2>
          <p className="text-sm text-gray-400">
            Simulate a new payment
          </p>
        </div>

        <button
          onClick={handleGenerate}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
        >
          Generate
        </button>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="glass rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">
          Transaction History
        </h2>

        {myTransactions.length === 0 ? (
          <p className="text-gray-400">
            No transactions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 text-gray-300">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Amount</th>
                  <th className="py-2 px-2">Location</th>
                  <th className="py-2 px-2">Risk</th>
                  <th className="py-2 px-2">Level</th>
                </tr>
              </thead>

              <tbody>
                {myTransactions.map((tx, i) => (
                  <tr
                    key={tx.transactionId}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-2 px-2">{i + 1}</td>
                    <td className="py-2 px-2">
                      ₹{tx.amount}
                    </td>
                    <td className="py-2 px-2">
                      {tx.location}
                    </td>
                    <td className="py-2 px-2">
                      {tx.riskScore}
                    </td>
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
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
