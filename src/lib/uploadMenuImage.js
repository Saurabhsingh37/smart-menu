import { supabase } from "./supabase";

const bucketName = "menu-images";

export async function uploadMenuImage(file, folder, fileName) {
  if (!file) {
    throw new Error("No image selected.");
  }

  // Allow only common image formats
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please select a JPG, PNG, WebP, or AVIF image.");
  }

  // 5 MB limit for menu images
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5MB.");
  }

  // Keep the filename safe
  const safeFileName = fileName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");

  const filePath = `${folder}/${safeFileName}-${Date.now()}.${file.name
    .split(".")
    .pop()
    .toLowerCase()}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return {
    path: filePath,
    publicUrl: data.publicUrl,
  };
}