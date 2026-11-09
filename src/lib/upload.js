import { ApiError } from "@/lib/api";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/constants";

export function validateImage(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Please choose a JPG, PNG, WEBP or GIF image.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "The image is too big. Please choose one under 5 MB.";
  }
  return "";
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  let response;
  try {
    response = await fetch("/api/upload", { method: "POST", body: formData });
  } catch {
    throw new ApiError("Could not upload the image. Check your connection.", 0);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.url) {
    throw new ApiError(data?.message || "Image upload failed.", response.status);
  }

  return data.url;
}