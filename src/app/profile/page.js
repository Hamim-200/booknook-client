import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookMarked, BookPlus, Library } from "lucide-react";
import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/login?redirect=/profile");

  const { user } = session;

  const initials =
    user.name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container-page py-12">
      <h1 className="section-title mb-8 text-center">My Profile</h1>

      <Card className="mx-auto w-full max-w-lg">
        <CardContent className="flex flex-col items-center text-center">
          <Avatar className="size-24">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>

          <h2 className="mt-4 text-2xl font-bold text-foreground">
            {user.name}
          </h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Member since {memberSince}
          </p>

          <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
            <Link
              href="/add-book"
              className={buttonVariants({ variant: "outline" })}
            >
              <BookPlus className="size-4" />
              Add Book
            </Link>
            <Link
              href="/my-books"
              className={buttonVariants({ variant: "outline" })}
            >
              <Library className="size-4" />
              My Books
            </Link>
            <Link
              href="/my-borrows"
              className={buttonVariants({ variant: "outline" })}
            >
              <BookMarked className="size-4" />
              My Borrows
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}