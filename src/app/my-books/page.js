import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyBooks from "@/components/books/MyBooks";
import { auth } from "@/lib/auth";

export const metadata = { title: "My Books" };

export default async function MyBooksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login?redirect=/my-books");

  return <MyBooks email={session.user.email} />;
}