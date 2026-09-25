export async function compressMenuImage(file, options = {}) {
  const maxWidth = options.maxWidth ?? 1600;
  const maxHeight = options.maxHeight ?? 1600;
  const maxSize = options.maxSize ?? 5 * 1024 * 1024;

  if (!file) {
    throw new Error("No image selected.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to read this image."));

      img.src = objectUrl;
    });

    const scale = Math.min(
      1,
      maxWidth / image.width,
      maxHeight / image.height
    );

    const width = Math.round(image.width * scale);
    const height = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Your browser cannot process this image.");
    }

    context.drawImage(image, 0, 0, width, height);

    let quality = 0.82;

    let blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/webp", quality);
    });

    while (blob && blob.size > maxSize && quality > 0.5) {
      quality -= 0.07;

      blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/webp", quality);
      });
    }

    if (!blob) {
      throw new Error("Unable to compress image.");
    }

    if (blob.size > maxSize) {
      throw new Error(
        "Image could not be compressed below the 5MB limit."
      );
    }

    const originalName =
      file.name.replace(/\.[^/.]+$/, "") || "menu-image";

    return new File(
      [blob],
      `${originalName}.webp`,
      {
        type: "image/webp",
        lastModified: Date.now(),
      }
    );
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}