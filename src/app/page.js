"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// TEMPORARY page. It will be replaced by the real Home page.
export default function Home() {
  return (
    <div className="container-page py-16">
      <h1 className="section-title mb-4">BookNook layout test</h1>
      <p className="mb-6 max-w-xl text-muted-foreground">
        Check the Navbar above and the Footer below. Then try the buttons.
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
        <Link
          href="/this-page-does-not-exist"
          className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground"
        >
          Test the 404 page
        </Link>
      </div>
    </div>
  );
}