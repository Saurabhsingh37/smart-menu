import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    categories: 0,
    items: 0,
    available: 0,
    popular: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);

    try {
      // Total categories
      const { count: categories, error: categoryError } =
        await supabase
          .from("menu_categories")
          .select("*", { count: "exact", head: true });

      if (categoryError) throw categoryError;

      // Total menu items
      const { count: items, error: itemError } =
        await supabase
          .from("menu_items")
          .select("*", { count: "exact", head: true });

      if (itemError) throw itemError;

      // Available items
      const { count: available, error: availableError } =
        await supabase
          .from("menu_items")
          .select("*", { count: "exact", head: true })
          .eq("is_available", true);

      if (availableError) throw availableError;

      // Popular items
      const { count: popular, error: popularError } =
        await supabase
          .from("menu_items")
          .select("*", { count: "exact", head: true })
          .eq("is_popular", true);

      if (popularError) throw popularError;

      setStats({
        categories: categories || 0,
        items: items || 0,
        available: available || 0,
        popular: popular || 0,
      });
    } catch (error) {
      console.error("Dashboard stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#120b08] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#1b100c]">
        <div className="flex items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold text-orange-400">
              HOT & SPICE
            </h1>

            <p className="text-sm text-gray-400">
              Restaurant Admin Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Dashboard
        </h2>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Categories */}
          <div className="rounded-2xl border border-white/10 bg-[#1b100c] p-5">
            <p className="text-sm text-gray-400">
              Total Categories
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {loading ? "..." : stats.categories}
            </p>
          </div>

          {/* Items */}
          <div className="rounded-2xl border border-white/10 bg-[#1b100c] p-5">
            <p className="text-sm text-gray-400">
              Total Menu Items
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {loading ? "..." : stats.items}
            </p>
          </div>

          {/* Available */}
          <div className="rounded-2xl border border-white/10 bg-[#1b100c] p-5">
            <p className="text-sm text-gray-400">
              Available Items
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {loading ? "..." : stats.available}
            </p>
          </div>

          {/* Popular */}
          <div className="rounded-2xl border border-white/10 bg-[#1b100c] p-5">
            <p className="text-sm text-gray-400">
              Popular Items
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {loading ? "..." : stats.popular}
            </p>
          </div>

        </div>

        {/* Menu Management */}
        <div className="mt-8">

          <h2 className="mb-4 text-xl font-semibold">
            Menu Management
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <button
              onClick={() => navigate("/admin/menu")}
              className="rounded-2xl border border-orange-500/20 bg-[#1b100c] p-6 text-left transition hover:border-orange-400/50"
            >
              <h3 className="text-lg font-semibold">
                All Menu Items
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                View and manage all restaurant dishes.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/menu/add")}
              className="rounded-2xl border border-orange-500/20 bg-[#1b100c] p-6 text-left transition hover:border-orange-400/50"
            >
              <h3 className="text-lg font-semibold">
                Add New Item
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Add food, price, image and details.
              </p>
            </button>

            <button
              onClick={() => navigate("/admin/categories")}
              className="rounded-2xl border border-orange-500/20 bg-[#1b100c] p-6 text-left transition hover:border-orange-400/50"
            >
              <h3 className="text-lg font-semibold">
                Categories
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Manage your restaurant categories.
              </p>
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;