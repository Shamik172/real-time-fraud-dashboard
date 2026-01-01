import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "IN"
  });

  const submit = async () => {
    try {
      const res = await api.post("/auth/signup", form);
      login(res.data.token, res.data.role);
      navigate("/user");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="glass rounded-2xl p-8 w-[380px] border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Name
          </label>
          <input
            placeholder="John Doe"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="user@example.com"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* LOCATION */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">
            Location
          </label>
          <select
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-white/20
                       focus:outline-none focus:border-blue-500"
          >
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="BR">Brazil</option>
            <option value="RU">Russia</option>
            <option value="NG">Nigeria</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600
                     transition font-semibold text-white tracking-wide"
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Real-Time Fraud Detection Platform
        </p>
      </div>
    </div>
  );
};

export default Signup;
