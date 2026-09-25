import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadMenuImage } from "../lib/uploadMenuImage";

function ImageUploadTest() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 1️⃣ Upload image to Storage
      const result = await uploadMenuImage(
        file,
        "south-indian",
        "masala-dosa"
      );

      console.log("✅ Image uploaded:", result);

      // 2️⃣ Save image URL into existing Masala Dosa item
      const { error: updateError } = await supabase
        .from("menu_items")
        .update({
          image_url: result.publicUrl,
          image_alt: "Masala Dosa served at Hot & Spice Restaurant",
        })
        .eq("slug", "masala-dosa");

      if (updateError) {
        throw updateError;
      }

      // 3️⃣ Show uploaded image
      setImageUrl(result.publicUrl);

      console.log("✅ Database image_url updated!");
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setError(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Menu Image Upload Test</h2>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Masala Dosa"}
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>✅ Image uploaded and database updated!</p>

          <img
            src={imageUrl}
            alt="Masala Dosa"
            style={{
              width: "300px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />

          <p>
            <strong>Storage URL:</strong>
          </p>

          <p
            style={{
              maxWidth: "600px",
              wordBreak: "break-all",
            }}
          >
            {imageUrl}
          </p>
        </div>
      )}
    </div>
  );
}

export default ImageUploadTest;