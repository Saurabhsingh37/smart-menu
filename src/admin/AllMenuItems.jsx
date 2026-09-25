import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AllMenuItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    setLoading(true);
    setError("");

    const [{ data: itemsData, error: itemsError }, { data: categoriesData, error: categoriesError }] =
      await Promise.all([
        supabase
          .from("menu_items")
          .select(`
            id,
            category_id,
            name,
            slug,
            description,
            ingredients,
            price,
            image_url,
            image_alt,
            spice_level,
            is_popular,
            is_featured,
            is_available,
            sort_order,
            created_at,
            menu_categories (
              name,
              slug
            )
          `)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false }),

        supabase
          .from("menu_categories")
          .select("id, name, slug")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

    if (itemsError) {
      setError(itemsError.message);
    } else {
      setItems(itemsData || []);
    }

    if (categoriesError) {
      setError(categoriesError.message);
    } else {
      setCategories(categoriesData || []);
    }

    setLoading(false);
  };

  const filteredItems = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.name?.toLowerCase().includes(searchText) ||
        item.description?.toLowerCase().includes(searchText) ||
        item.ingredients?.toLowerCase().includes(searchText);

      const matchesCategory =
        categoryFilter === "all" ||
        item.category_id === categoryFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && item.is_available) ||
        (availabilityFilter === "unavailable" && !item.is_available);

      return matchesSearch && matchesCategory && matchesAvailability;
    });
  }, [items, search, categoryFilter, availabilityFilter]);

  const toggleAvailability = async (item) => {
    setMessage("");
    setError("");

    const newStatus = !item.is_available;

    const { error } = await supabase
      .from("menu_items")
      .update({
        is_available: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, is_available: newStatus }
          : currentItem
      )
    );

    setMessage(
      `${item.name} is now ${
        newStatus ? "available" : "unavailable"
      }.`
    );
  };

  const deleteItem = async (item) => {
    const confirmed = window.confirm(
      `Delete "${item.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== item.id)
    );

    setMessage(`${item.name} deleted successfully.`);
  };

  const getSpiceLabel = (level) => {
    if (level === 0) return "Mild";
    if (level === 1) return "Medium";
    if (level === 2) return "Hot";
    if (level === 3) return "Very Hot";

    return "Mild";
  };

  return (
    <div className="min-h-screen bg-[#0b0908] text-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              HOT & SPICE
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              All Menu Items
            </h1>

            <p className="mt-2 text-sm text-white/55">
              Manage your restaurant menu from one place.
            </p>
          </div>

          <Link
            to="/admin/menu/add"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
          >
            + Add New Item
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Total Items</p>
            <p className="mt-2 text-3xl font-bold">{items.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Available</p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {items.filter((item) => item.is_available).length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Unavailable</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {items.filter((item) => !item.is_available).length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-white/45">Featured</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {items.filter((item) => item.is_featured).length}
            </p>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu items..."
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition placeholder:text-white/25 focus:border-orange-500/50"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-orange-500/50"
              >
                <option value="all">All Categories</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/45">
                Availability
              </label>

              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-orange-500/50"
              >
                <option value="all">All Items</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-white/45">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredItems.length}
            </span>{" "}
            item{filteredItems.length !== 1 ? "s" : ""}
          </p>

          <button
            onClick={fetchMenuData}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
            <p className="text-sm text-white/50">
              Loading menu items...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="mb-3 text-4xl">🍽️</div>

            <h2 className="text-lg font-semibold">
              No menu items found
            </h2>

            <p className="mt-2 text-sm text-white/45">
              Try changing your filters or add a new menu item.
            </p>

            <Link
              to="/admin/menu/add"
              className="mt-5 inline-flex rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black"
            >
              + Add Menu Item
            </Link>
          </div>
        )}

        {/* Menu Cards */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl border bg-white/[0.04] transition ${
                  item.is_available
                    ? "border-white/10"
                    : "border-red-500/20 opacity-75"
                }`}
              >

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">

                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.image_alt || item.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">
                      🍽️
                    </div>
                  )}

                  {/* Availability */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
                        item.is_available
                          ? "bg-green-500/80 text-white"
                          : "bg-red-500/80 text-white"
                      }`}
                    >
                      {item.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute right-3 top-3 flex gap-2">
                    {item.is_featured && (
                      <span className="rounded-full bg-yellow-400 px-2.5 py-1 text-xs font-bold text-black">
                        ★ Featured
                      </span>
                    )}

                    {item.is_popular && (
                      <span className="rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-black">
                        🔥 Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wider text-orange-400">
                        {item.menu_categories?.name || "Uncategorized"}
                      </p>

                      <h2 className="text-lg font-bold">
                        {item.name}
                      </h2>
                    </div>

                    <span className="whitespace-nowrap text-lg font-bold text-orange-400">
                      ₹{Number(item.price).toFixed(2)}
                    </span>
                  </div>

                  {item.description && (
                    <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/50">
                      {item.description}
                    </p>
                  )}

                  {/* Spice */}
                  <div className="mb-5 flex items-center justify-between text-xs">
                    <span className="text-white/40">
                      Spice Level
                    </span>

                    <span className="text-orange-300">
                      {"🌶️".repeat(item.spice_level || 0)}{" "}
                      {getSpiceLabel(item.spice_level)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2">

                    <button
                      onClick={() => toggleAvailability(item)}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.is_available ? "Hide" : "Show"}
                    </button>

                    <Link
                      to={`/admin/menu/edit/${item.id}`}
                      className="rounded-lg border border-orange-500/30 px-3 py-2 text-center text-xs font-semibold text-orange-300 transition hover:bg-orange-500/10"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteItem(item)}
                      className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMenuItems;