import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { uploadMenuImage } from "../lib/uploadMenuImage";
import { compressMenuImage } from "../lib/compressMenuImage";

const categoryFolders = {
  "breakfast-snacks": "breakfast",
  "south-indian": "south-indian",
  "mushroom-delights": "mushroom",
  "paneer-specials": "paneer",
  "vegetarian-main-course": "vegetables",
  "salads-raita": "salad-raita",
  "breads-papad": "breads",
  "rice-pulao": "rice",
  "sweets-desserts": "sweets",
  "signature-thalis": "thalis",
  "refreshing-beverages": "beverages",
  "hot-beverages": "hot-drinks",
  "indo-chinese": "chinese",
};

const EditMenuItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    description: "",
    ingredients: "",
    price: "",
    spice_level: 0,
    is_popular: false,
    is_featured: false,
    is_available: true,
    sort_order: 0,
    image_alt: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    setError("");

    const [{ data: item, error: itemError }, { data: categoryData, error: categoryError }] =
      await Promise.all([
        supabase
          .from("menu_items")
          .select("*")
          .eq("id", id)
          .single(),

        supabase
          .from("menu_categories")
          .select("id, name, slug")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

    if (itemError) {
      setError(itemError.message);
      setLoading(false);
      return;
    }

    if (categoryError) {
      setError(categoryError.message);
      setLoading(false);
      return;
    }

    setCategories(categoryData || []);

    setForm({
      name: item.name || "",
      category_id: item.category_id || "",
      description: item.description || "",
      ingredients: item.ingredients || "",
      price: item.price || "",
      spice_level: item.spice_level ?? 0,
      is_popular: item.is_popular ?? false,
      is_featured: item.is_featured ?? false,
      is_available: item.is_available ?? true,
      sort_order: item.sort_order ?? 0,
      image_alt: item.image_alt || "",
    });

    setCurrentImage(item.image_url || "");
    setImagePreview(item.image_url || "");

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");
    setProcessingImage(true);

    try {
      const compressedFile = await compressMenuImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        maxSize: 5 * 1024 * 1024,
      });

      const previewUrl = URL.createObjectURL(compressedFile);

      setSelectedImage(compressedFile);
      setImagePreview(previewUrl);

      if (!form.image_alt) {
        setForm((prev) => ({
          ...prev,
          image_alt: prev.name || "Menu item",
        }));
      }
    } catch (err) {
      setError(err.message || "Unable to process image.");
    } finally {
      setProcessingImage(false);
    }
  };

  const handleRemoveNewImage = () => {
    setSelectedImage(null);
    setImagePreview(currentImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Please enter the menu item name.");
      return;
    }

    if (!form.category_id) {
      setError("Please select a category.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    setSaving(true);

    try {
      const selectedCategory = categories.find(
        (category) => category.id === form.category_id
      );

      if (!selectedCategory) {
        throw new Error("Selected category could not be found.");
      }

      let imageUrl = currentImage;

      // Upload new image only when user selected one
      if (selectedImage) {
        const folder = categoryFolders[selectedCategory.slug];

        if (!folder) {
          throw new Error(
            "No image storage folder is configured for this category."
          );
        }

        const uploadResult = await uploadMenuImage(
          selectedImage,
          folder,
          form.name
        );

        imageUrl = uploadResult.publicUrl;
      }

      const slug =
        form.name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") +
        `-${id.slice(0, 8)}`;

      const { error: updateError } = await supabase
        .from("menu_items")
        .update({
          category_id: form.category_id,
          name: form.name.trim(),
          slug,
          description: form.description.trim(),
          ingredients: form.ingredients.trim(),
          price: Number(form.price),
          image_url: imageUrl || null,
          image_alt: form.image_alt.trim() || form.name.trim(),
          spice_level: Number(form.spice_level),
          is_popular: form.is_popular,
          is_featured: form.is_featured,
          is_available: form.is_available,
          sort_order: Number(form.sort_order) || 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }

      setCurrentImage(imageUrl);
      setSelectedImage(null);
      setSuccess("Menu item updated successfully.");

      setTimeout(() => {
        navigate("/admin/menu");
      }, 1000);
    } catch (err) {
      setError(err.message || "Unable to update menu item.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0908] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-orange-500" />
          <p className="text-sm text-white/50">
            Loading menu item...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0908] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/admin/menu"
              className="mb-3 inline-block text-sm text-orange-400 hover:text-orange-300"
            >
              ← Back to Menu
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
              HOT & SPICE
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Edit Menu Item
            </h1>
          </div>
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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Item Name *
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Paneer Tikka"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Category *
                </label>

                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/60">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe this delicious dish..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/60">
                  Ingredients
                </label>

                <textarea
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Paneer, capsicum, onion, spices..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                />
              </div>
            </div>
          </section>

          {/* Price & Settings */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <h2 className="mb-5 text-lg font-semibold">
              Pricing & Settings
            </h2>

            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Price (₹) *
                </label>

                <input
                  name="price"
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Spice Level
                </label>

                <select
                  name="spice_level"
                  value={form.spice_level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                >
                  <option value="0">🌶️ Mild</option>
                  <option value="1">🌶️🌶️ Medium</option>
                  <option value="2">🌶️🌶️🌶️ Hot</option>
                  <option value="3">🌶️🌶️🌶️🌶️ Very Hot</option>
                </select>
              </div>

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
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="text-sm">
                  Available
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <input
                  type="checkbox"
                  name="is_popular"
                  checked={form.is_popular}
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="text-sm">
                  🔥 Popular
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />
                <span className="text-sm">
                  ⭐ Featured
                </span>
              </label>
            </div>
          </section>

          {/* Image */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7">
            <h2 className="mb-2 text-lg font-semibold">
              Menu Image
            </h2>

            <p className="mb-5 text-sm text-white/40">
              Upload a new image only if you want to replace the current one.
            </p>

            <div className="grid gap-6 md:grid-cols-2">

              {/* Preview */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={form.image_alt || form.name}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center text-5xl">
                    🍽️
                  </div>
                )}
              </div>

              {/* Upload */}
              <div>
                <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-center transition hover:border-orange-500/40">

                  <div className="mb-3 text-4xl">
                    📸
                  </div>

                  <p className="font-semibold">
                    {processingImage
                      ? "Processing image..."
                      : "Choose new image"}
                  </p>

                  <p className="mt-2 text-xs text-white/40">
                    JPG, PNG, WebP or AVIF
                    <br />
                    Maximum 5MB
                  </p>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {selectedImage && (
                  <button
                    type="button"
                    onClick={handleRemoveNewImage}
                    className="mt-3 w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                  >
                    Cancel New Image
                  </button>
                )}

                <div className="mt-4">
                  <label className="mb-2 block text-sm text-white/60">
                    Image Alt Text
                  </label>

                  <input
                    name="image_alt"
                    value={form.image_alt}
                    onChange={handleChange}
                    placeholder="Paneer Tikka"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-orange-500/50"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/admin/menu"
              className="rounded-xl border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || processingImage}
              className="rounded-xl bg-orange-500 px-7 py-3 text-sm font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenuItem;