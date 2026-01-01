import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";

const Dashboard = () => {
  useSocket();

  const transactions = useSelector(
    (state) => state.transactions.list
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Transactions</h2>

      <ul>
        {transactions.map((tx) => (
          <li key={tx.transactionId}>
            ₹{tx.amount} — {tx.location} — {tx.riskLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
