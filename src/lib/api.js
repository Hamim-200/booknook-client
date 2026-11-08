import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// An error that also remembers the HTTP status (401, 403, 404, 409 ...)
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// One function for every call to our Express server.
//   path:  "/books", "/borrows/123" ...
//   auth:  true  -> attach the login token (needed for protected routes)
//   body:  an object, sent as JSON
// It returns the JSON from the server, or throws an ApiError with a message
// that is safe to show in a toast.
export async function apiFetch(path, { auth = false, method = "GET", body } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    // Ask Better Auth for a fresh token (it lasts about 15 minutes)
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      throw new ApiError("Please log in to continue.", 401);
    }
    headers.Authorization = `Bearer ${data.token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 0);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(data?.message || "Something went wrong.", response.status);
  }

  return data;
}