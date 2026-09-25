import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  icon: "",
  sort_order: 0,
  is_active: true,
};

const makeSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [itemCounts, setItemCounts] = useState({});

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setCategories(data || []);

    // Get menu item counts for each category
    const { data: items, error: itemsError } = await supabase
      .from("menu_items")
      .select("id, category_id");

    if (!itemsError) {
      const counts = {};

      (items || []).forEach((item) => {
        counts[item.category_id] =
          (counts[item.category_id] || 0) + 1;
      });

      setItemCounts(counts);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;

    setForm((prev) => ({
      ...prev,
      name,
      slug: editingId ? prev.slug : makeSlug(name),
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
  };

  const startEdit = (category) => {
    setEditingId(category.id);

    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      icon: category.icon || "",
      sort_order: category.sort_order ?? 0,
      is_active: category.is_active ?? true,
    });

    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    const slug = makeSlug(form.slug || form.name);

    if (!slug) {
      setError("Please enter a valid category name or slug.");
      return;
    }

    setSaving(true);

    try {
      // Check duplicate slug
      let duplicateQuery = supabase
        .from("menu_categories")
        .select("id")
        .eq("slug", slug);

      if (editingId) {
        duplicateQuery = duplicateQuery.neq("id", editingId);
      }

      const { data: duplicateData, error: duplicateError } =
        await duplicateQuery;

      if (duplicateError) {
        throw duplicateError;
      }

      if (duplicateData?.length > 0) {
        throw new Error(
          `The slug "${slug}" is already being used.`
        );
      }

      const categoryData = {
        name: form.name.trim(),
        slug,
        description: form.description.trim() || null,
        icon: form.icon.trim() || null,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("menu_categories")
          .update(categoryData)
          .eq("id", editingId);

        if (updateError) {
          throw updateError;
        }

        setSuccess("Category updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("menu_categories")
          .insert(categoryData);

        if (insertError) {
          throw insertError;
        }

        setSuccess("Category created successfully.");
      }

      resetForm();
      await fetchCategories();
    } catch (err) {
      setError(err.message || "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (category) => {
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("menu_categories")
      .update({
        is_active: !category.is_active,
      })
      .eq("id", category.id);

    if (error) {
      setError(error.message);
      return;
    }

    setCategories((current) =>
      current.map((item) =>
        item.id === category.id
          ? {
              ...item,
              is_active: !item.is_active,
            }
          : item
      )
    );

    setSuccess(
      `${category.name} is now ${
        !category.is_active ? "active" : "inactive"
      }.`
    );
  };

  const deleteCategory = async (category) => {
    const count = itemCounts[category.id] || 0;

    if (count > 0) {
      setError(
        `"${category.name}" contains ${count} menu item${
          count === 1 ? "" : "s"
        }. Please move or delete those items before deleting this category.`
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete "${category.name}"?\n\nThis category has no menu items and can be safely deleted.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("menu_categories")
      .delete()
      .eq("id", category.id);

    if (error) {
      setError(error.message);
      return;
    }

    setCategories((current) =>
      current.filter((item) => item.id !== category.id)
    );

    setSuccess(`${category.name} deleted successfully.`);
  };

  const activeCount = categories.filter(
    (category) => category.is_active
  ).length;

  const totalItems = Object.values(itemCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="min-h-screen bg-[#0b0908] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/admin/dashboard"
            className="mb-4 inline-block text-sm text-orange-400 transition hover:text-orange-300"
          >
            ← Back to Dashboard
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            HOT & SPICE
          </p>

          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Manage Categories
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Organize your vegetarian menu into clean, easy-to-browse
            categories.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {success}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          {/* Form */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">

              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {editingId
                      ? "Edit Category"
                      : "Add Category"}
                  </h2>

                  <p className="mt-1 text-xs text-white/40">
                    {editingId
                      ? "Update category details"
                      : "Create a new menu category"}
                  </p>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-white/40 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Category Name *
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="Paneer Specials"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-orange-500/50"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Slug *
                  </label>

                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="paneer-specials"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-orange-500/50"
                  />

                  <p className="mt-2 text-[11px] text-white/30">
                    Used internally for URLs and category mapping.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Delicious paneer dishes..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-orange-500/50"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Icon / Emoji
                  </label>

                  <input
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                    placeholder="🍛"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-orange-500/50"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="mb-2 block text-sm text-white/60">
                    Sort Order
                  </label>

                  <input
                    name="sort_order"
                    type="number"
                    min="0"
                    value={form.sort_order}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-orange-500/50"
                  />
                </div>

                {/* Active */}
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 accent-orange-500"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Active Category
                    </p>

                    <p className="mt-1 text-xs text-white/35">
                      Show this category on the customer menu.
                    </p>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-xl bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Category"
                    : "Create Category"}
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Categories
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {categories.length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-green-400">
                  {activeCount}
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider text-white/40">
                  Menu Items
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-400">
                  {totalItems}
                </p>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />

                <p className="text-sm text-white/50">
                  Loading categories...
                </p>
              </div>
            )}

            {/* Category List */}
            {!loading && (
              <div className="space-y-3">

                {categories.map((category) => {
                  const count = itemCounts[category.id] || 0;

                  return (
                    <div
                      key={category.id}
                      className={`rounded-2xl border p-4 transition md:p-5 ${
                        category.is_active
                          ? "border-white/10 bg-white/[0.04]"
                          : "border-white/5 bg-white/[0.02] opacity-70"
                      }`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                        {/* Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl">
                          {category.icon || "🍽️"}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold">
                              {category.name}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                category.is_active
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {category.is_active
                                ? "ACTIVE"
                                : "INACTIVE"}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-white/30">
                            /{category.slug}
                          </p>

                          {category.description && (
                            <p className="mt-2 line-clamp-1 text-sm text-white/45">
                              {category.description}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/40">
                            <span>
                              🍽️ {count} item
                              {count === 1 ? "" : "s"}
                            </span>

                            <span>
                              ↕ Order: {category.sort_order}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 gap-2">

                          <button
                            type="button"
                            onClick={() => toggleActive(category)}
                            className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
                          >
                            {category.is_active
                              ? "Hide"
                              : "Show"}
                          </button>

                          <button
                            type="button"
                            onClick={() => startEdit(category)}
                            className="rounded-lg border border-orange-500/20 px-3 py-2 text-xs font-semibold text-orange-300 transition hover:bg-orange-500/10"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteCategory(category)}
                            className="rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                          >
                            Delete
                          </button>

                        </div>
                      </div>
                    </div>
                  );
                })}

                {categories.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
                    <div className="mb-3 text-4xl">
                      📂
                    </div>

                    <h3 className="font-semibold">
                      No categories found
                    </h3>

                    <p className="mt-2 text-sm text-white/40">
                      Create your first menu category.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;