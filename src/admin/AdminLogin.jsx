import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "hotspice@123") {
      sessionStorage.setItem("adminLoggedIn", "true");

      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#120b08] flex items-center justify-center px-5">

      <div className="w-full max-w-md rounded-2xl border border-orange-500/20 bg-[#1b100c] p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-orange-400">
            HOT & SPICE
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Restaurant Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Admin Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            Login to Admin
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;