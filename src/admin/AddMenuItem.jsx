import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";
import { uploadMenuImage } from "../lib/uploadMenuImage";
import { compressMenuImage } from "../lib/compressMenuImage";


// Supabase Storage folder mapping
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


function AddMenuItem() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [saving, setSaving] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Image states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [originalImageSize, setOriginalImageSize] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    description: "",
    ingredients: "",
    spice_level: "0",
    is_available: true,
    is_popular: false,
    is_featured: false,
    sort_order: "0",
  });


  // --------------------------------
  // Load categories
  // --------------------------------

  useEffect(() => {
    fetchCategories();

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order");

    if (error) {
      console.error("Category loading error:", error);

      setError("Unable to load categories.");
      setLoadingCategories(false);

      return;
    }

    setCategories(data || []);
    setLoadingCategories(false);
  };


  // --------------------------------
  // Form change
  // --------------------------------

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
    setSuccess("");
  };


  // --------------------------------
  // Create slug
  // --------------------------------

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };


  // --------------------------------
  // Format image size
  // --------------------------------

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${(bytes / 1024).toFixed(0)} KB`;
  };


  // --------------------------------
  // Image selection
  // --------------------------------

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please select a JPG, PNG, WebP, or AVIF image."
      );

      e.target.value = "";
      return;
    }

    setOriginalImageSize(file.size);
    setProcessingImage(true);

    try {
      // Compress original image
      const optimizedImage = await compressMenuImage(file, {
        maxWidth: 1600,
        maxHeight: 1600,
        maxSize: 5 * 1024 * 1024,
      });

      // Remove previous preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const previewUrl = URL.createObjectURL(
        optimizedImage
      );

      setSelectedImage(optimizedImage);
      setImagePreview(previewUrl);

    } catch (error) {
      console.error(
        "Image compression error:",
        error
      );

      setSelectedImage(null);
      setImagePreview("");

      setError(
        error.message ||
          "Unable to process this image."
      );
    } finally {
      setProcessingImage(false);

      // Allow selecting same image again
      e.target.value = "";
    }
  };


  // --------------------------------
  // Remove image
  // --------------------------------

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");
    setOriginalImageSize(0);
  };


  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");


    // -----------------------------
    // Validation
    // -----------------------------

    if (!formData.name.trim()) {
      setError("Please enter the food name.");
      return;
    }

    if (!formData.category_id) {
      setError("Please select a category.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }


    setSaving(true);


    try {

      // -----------------------------
      // Create slug
      // -----------------------------

      const slug = createSlug(
        formData.name
      );


      if (!slug) {
        throw new Error(
          "Please enter a valid food name."
        );
      }


      // -----------------------------
      // Check duplicate slug
      // -----------------------------

      const {
        data: existingItem,
        error: slugCheckError,
      } = await supabase
        .from("menu_items")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();


      if (slugCheckError) {
        throw slugCheckError;
      }


      if (existingItem) {
        throw new Error(
          "A menu item with this name already exists."
        );
      }


      // -----------------------------
      // Find selected category
      // -----------------------------

      const selectedCategory =
        categories.find(
          (category) =>
            category.id ===
            formData.category_id
        );


      if (!selectedCategory) {
        throw new Error(
          "Selected category could not be found."
        );
      }


      // -----------------------------
      // Find storage folder
      // -----------------------------

      const folder =
        categoryFolders[
          selectedCategory.slug
        ];


      if (!folder) {
        throw new Error(
          `No image folder configured for "${selectedCategory.name}".`
        );
      }


      // -----------------------------
      // Upload image
      // -----------------------------

      let imageUrl = null;
      let uploadedImagePath = null;


      if (selectedImage) {

        const uploadResult =
          await uploadMenuImage(
            selectedImage,
            folder,
            slug
          );


        imageUrl =
          uploadResult.publicUrl;

        uploadedImagePath =
          uploadResult.path;
      }


      // -----------------------------
      // Image alt text
      // -----------------------------

      const imageAlt = selectedImage
        ? `${formData.name.trim()} served at Hot & Spice Restaurant`
        : null;


      // -----------------------------
      // Insert menu item
      // -----------------------------

      const {
        error: insertError,
      } = await supabase
        .from("menu_items")
        .insert({

          category_id:
            formData.category_id,

          name:
            formData.name.trim(),

          slug,

          description:
            formData.description.trim() ||
            null,

          ingredients:
            formData.ingredients.trim() ||
            null,

          price:
            Number(formData.price),

          image_url:
            imageUrl,

          image_alt:
            imageAlt,

          spice_level:
            Number(formData.spice_level),

          is_available:
            formData.is_available,

          is_popular:
            formData.is_popular,

          is_featured:
            formData.is_featured,

          sort_order:
            Number(formData.sort_order) || 0,
        });


      if (insertError) {

        // Try to remove uploaded image
        // if database insert fails.
        if (uploadedImagePath) {
          const {
            error: cleanupError,
          } = await supabase.storage
            .from("menu-images")
            .remove([
              uploadedImagePath,
            ]);

          if (cleanupError) {
            console.warn(
              "Image cleanup failed:",
              cleanupError
            );
          }
        }

        throw insertError;
      }


      // -----------------------------
      // Success
      // -----------------------------

      setSuccess(
        "Menu item added successfully! 🎉"
      );


      // -----------------------------
      // Reset form
      // -----------------------------

      setFormData({
        name: "",
        category_id: "",
        price: "",
        description: "",
        ingredients: "",
        spice_level: "0",
        is_available: true,
        is_popular: false,
        is_featured: false,
        sort_order: "0",
      });


      handleRemoveImage();

    } catch (error) {

      console.error(
        "Add menu item error:",
        error
      );

      setError(
        error.message ||
          "Failed to add menu item."
      );

    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#120b08] text-white">

      {/* =========================
          HEADER
      ========================== */}

      <header className="border-b border-white/10 bg-[#1b100c]">

        <div className="flex items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold text-orange-400">
              HOT & SPICE
            </h1>

            <p className="text-sm text-gray-400">
              Add New Menu Item
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/admin/dashboard")
            }
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5"
          >
            Back to Dashboard
          </button>

        </div>

      </header>


      {/* =========================
          MAIN
      ========================== */}

      <main className="mx-auto max-w-4xl p-6">

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-[#1b100c] p-6"
        >

          <h2 className="mb-6 text-xl font-semibold">
            Food Information
          </h2>


          {/* =========================
              MESSAGES
          ========================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}


          {success && (
            <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}


          <div className="grid gap-6 md:grid-cols-2">


            {/* =========================
                FOOD NAME
            ========================== */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-gray-300">
                Food Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Paneer Tikka"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />

            </div>


            {/* =========================
                CATEGORY
            ========================== */}

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Category *
              </label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                disabled={loadingCategories}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              >

                <option value="">
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select category"}
                </option>


                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* =========================
                PRICE
            ========================== */}

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Price (₹) *
              </label>

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="160"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />

            </div>


            {/* =========================
                DESCRIPTION
            ========================== */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Crispy golden dosa filled with flavorful potato masala..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />

            </div>


            {/* =========================
                INGREDIENTS
            ========================== */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-gray-300">
                Ingredients
              </label>

              <input
                type="text"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Paneer • Capsicum • Onion • Yogurt • Spices"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />

            </div>


            {/* =========================
                IMAGE UPLOAD
            ========================== */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-gray-300">
                Food Image
              </label>


              <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-5">


                {/* IMAGE PREVIEW */}

                {imagePreview ? (

                  <div className="space-y-4">

                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30">

                      <img
                        src={imagePreview}
                        alt="Menu item preview"
                        className="h-64 w-full object-cover"
                      />

                    </div>


                    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="text-sm font-medium text-white">
                          {selectedImage?.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">

                          Optimized:{" "}

                          {formatFileSize(
                            selectedImage?.size
                          )}

                          {originalImageSize >
                            selectedImage?.size && (
                            <>
                              {" "}
                              • Original:{" "}
                              {formatFileSize(
                                originalImageSize
                              )}
                            </>
                          )}

                        </p>

                        <p className="mt-1 text-xs text-green-400">
                          ✓ Optimized WebP image
                        </p>

                      </div>


                      <button
                        type="button"
                        onClick={
                          handleRemoveImage
                        }
                        disabled={saving}
                        className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ) : (

                  /* IMAGE PICKER */

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] px-6 py-10 text-center transition hover:bg-white/[0.04]">

                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl">
                      📸
                    </div>

                    <p className="text-sm font-medium text-white">
                      {processingImage
                        ? "Optimizing image..."
                        : "Choose food image"}
                    </p>

                    <p className="mt-2 max-w-md text-xs leading-5 text-gray-500">
                      JPG, PNG, WebP or AVIF.
                      Large images are automatically
                      resized and compressed before
                      uploading.
                    </p>


                    {!processingImage && (
                      <span className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-orange-400">
                        Select Image
                      </span>
                    )}


                    {processingImage && (
                      <span className="mt-4 rounded-lg border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
                        Processing...
                      </span>
                    )}


                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={
                        handleImageChange
                      }
                      disabled={
                        processingImage ||
                        saving
                      }
                      className="hidden"
                    />

                  </label>

                )}

              </div>

            </div>


            {/* =========================
                SPICE LEVEL
            ========================== */}

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Spice Level
              </label>

              <select
                name="spice_level"
                value={
                  formData.spice_level
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              >

                <option value="0">
                  0 — No Spice
                </option>

                <option value="1">
                  1 — Mild
                </option>

                <option value="2">
                  2 — Medium
                </option>

                <option value="3">
                  3 — Spicy
                </option>

              </select>

            </div>


            {/* =========================
                DISPLAY ORDER
            ========================== */}

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Display Order
              </label>

              <input
                type="number"
                name="sort_order"
                min="0"
                value={
                  formData.sort_order
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />

            </div>

          </div>


          {/* =========================
              SETTINGS
          ========================== */}

          <div className="mt-8 border-t border-white/10 pt-6">

            <h3 className="mb-4 text-lg font-semibold">
              Menu Settings
            </h3>


            <div className="space-y-4">


              {/* AVAILABLE */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="is_available"
                  checked={
                    formData.is_available
                  }
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />

                <span className="text-sm text-gray-300">
                  Available for customers
                </span>

              </label>


              {/* POPULAR */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="is_popular"
                  checked={
                    formData.is_popular
                  }
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />

                <span className="text-sm text-gray-300">
                  Mark as Popular / Bestseller
                </span>

              </label>


              {/* FEATURED */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="is_featured"
                  checked={
                    formData.is_featured
                  }
                  onChange={handleChange}
                  className="h-4 w-4 accent-orange-500"
                />

                <span className="text-sm text-gray-300">
                  Mark as Featured / Chef Special
                </span>

              </label>

            </div>

          </div>


          {/* =========================
              BUTTONS
          ========================== */}

          <div className="mt-8 flex gap-3">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/dashboard"
                )
              }
              disabled={saving}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={
                saving ||
                processingImage
              }
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {saving
                ? "Saving..."
                : processingImage
                ? "Processing Image..."
                : "Save Menu Item"}

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default AddMenuItem;