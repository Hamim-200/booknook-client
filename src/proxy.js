import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Runs before every private page opens
export async function proxy(request) {
  // Ask Better Auth if this visitor has a real, valid session
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    // Remember the page they wanted, so Login can send them back to it
    const { pathname, search } = request.nextUrl;
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only these paths go through the proxy. Everything else stays public.
export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/profile",
    "/books/:path+", // /books/<id> is private, but /books itself is public
  ],
};