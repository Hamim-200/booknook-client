"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookGrid from "@/components/books/BookGrid";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { Spinner } from "@/components/Spinner";
import { EmptyState, ErrorState } from "@/components/StateMessages";
import { buttonVariants } from "@/components/ui/button";
import { useApiData } from "@/hooks/useApiData";

export default function NewArrivals() {
  const { data: books, error, loading, reload } = useApiData("/books?limit=6");

  return (
    <section className="container-page py-16">
      <SectionHeading
        title="New Arrivals"
        text="The latest books added to the BookNook library."
      />

      {loading && (
        <div
          className="flex flex-col items-center gap-3 py-16"
          role="status"
        >
          <Spinner className="size-10" />
          <p className="text-sm text-muted-foreground">
            Loading new arrivals...
          </p>
        </div>
      )}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={reload} />
      )}

      {!loading && !error && books.length === 0 && (
        <EmptyState
          title="No books yet"
          text="The shelves are empty. Add the first book to the library."
          actionHref="/add-book"
          actionLabel="Add a Book"
        />
      )}

      {!loading && !error && books.length > 0 && (
        <>
          <Reveal>
            <BookGrid books={books} />
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Link href="/books" className={buttonVariants({ size: "lg" })}>
              See All Books
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}