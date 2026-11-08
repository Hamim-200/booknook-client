"use client";

import BookGrid from "@/components/books/BookGrid";
import PageLoader from "@/components/Spinner";
import { EmptyState, ErrorState } from "@/components/StateMessages";
import { useApiData } from "@/hooks/useApiData";

export default function AllBooks() {
  // GET /books is public, so no token is needed
  const { data: books, error, loading, reload } = useApiData("/books");

  return (
    <div className="container-page py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">All Books</h1>
        <p className="mt-2 text-muted-foreground">
          Browse the whole BookNook library and pick your next read.
        </p>
      </div>

      {loading && <PageLoader label="Loading books..." />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={reload} />
      )}

      {!loading && !error && books.length === 0 && (
        <EmptyState
          title="No books yet"
          text="The library is empty. Be the first to add a book."
          actionHref="/add-book"
          actionLabel="Add a Book"
        />
      )}

      {!loading && !error && books.length > 0 && <BookGrid books={books} />}
    </div>
  );
}