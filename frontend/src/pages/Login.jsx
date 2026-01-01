import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      login(res.data.token, res.data.role);
      navigate(res.data.role === "admin" ? "/admin" : "/user");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="glass rounded-2xl p-8 w-[360px] border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600
                     transition font-semibold text-white tracking-wide"
        >
          Login
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Fraud Detection Dashboard
        </p>
      </div>
    </div>
  );
};

export default Login;
