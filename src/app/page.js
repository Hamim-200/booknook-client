"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

// TEMPORARY page to test the theme. It will be replaced by the real Home page.
export default function Home() {
  return (
    <main className="container-page py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">BookNook theme test</h1>
        <ThemeToggle />
      </div>

      <p className="mb-6 max-w-xl text-muted-foreground">
        If you can see a cream background, a green button, and a serif heading,
        the theme works.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => toast.success("Success toast works")}>
          Show success toast
        </Button>
        <Button
          variant="destructive"
          onClick={() => toast.error("Error toast works")}
        >
          Show error toast
        </Button>
        <span className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground">
          Amber brand color
        </span>
      </div>
    </main>
  );
}