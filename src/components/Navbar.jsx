"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

// These three are private: they only show when the user is logged in
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // TEMPORARY: always logged out for now.
  // In the auth phase this will come from Better Auth.
  const user = null;

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  // "/" must match exactly, other links match their whole section
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive(href)
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Desktop auth buttons */}
          {!user && (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Register
              </Link>
            </div>
          )}

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                aria-label="Open menu"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation links
                  </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-1 px-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={linkClass(link.href)}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {!user && (
                  <div className="mt-4 flex flex-col gap-2 px-4">
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "outline" })}
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={buttonVariants()}
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}