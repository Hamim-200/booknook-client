import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/constants";


export async function POST(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) {
    return NextResponse.json(
      { message: "Please log in to upload images." },
      { status: 401 }
    );
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    console.error("IMGBB_API_KEY is missing in .env.local");
    return NextResponse.json(
      { message: "Image upload is not set up on the server." },
      { status: 500 }
    );
  }

  let file;
  try {
    const formData = await request.formData();
    file = formData.get("image");
  } catch {
    return NextResponse.json(
      { message: "Invalid upload request." },
      { status: 400 }
    );
  }

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { message: "Please choose an image." },
      { status: 400 }
    );
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: "Please choose a JPG, PNG, WEBP or GIF image." },
      { status: 400 }
    );
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json(
      { message: "The image is too big. Please choose one under 5 MB." },
      { status: 400 }
    );
  }

  const upload = new FormData();
  upload.append("image", file);

  let response;
  try {
    response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: upload,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the image service. Please try again." },
      { status: 502 }
    );
  }

  const result = await response.json().catch(() => null);
  const url = result?.data?.url || result?.data?.display_url;

  if (!response.ok || !url) {
    console.error(
      "imgbb upload failed:",
      result?.error?.message || response.status
    );
    return NextResponse.json(
      { message: "Image upload failed. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url });
}