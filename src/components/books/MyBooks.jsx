"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import DeleteBookDialog from "@/components/books/DeleteBookDialog";
import EditBookDialog from "@/components/books/EditBookDialog";
import MyBookCard from "@/components/books/MyBookCard";
import PageLoader from "@/components/Spinner";
import { EmptyState, ErrorState } from "@/components/StateMessages";
import { useApiData } from "@/hooks/useApiData";

export default function MyBooks({ email }) {
  const {
    data: books,
    error,
    loading,
    reload,
    setData,
  } = useApiData(`/books?email=${encodeURIComponent(email)}`);

  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  function handleSaved(updated) {
    setData((list) =>
      list.map((book) => (book._id === updated._id ? updated : book))
    );
    setEditingBook(null);
  }

  function handleDeleted(id) {
    setData((list) => list.filter((book) => book._id !== id));
    setDeletingBook(null);
  }

  return (
    <div className="container-page py-12">
      <div className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h1 className="section-title">My Books</h1>
          <p className="mt-2 text-muted-foreground">
            {!loading && !error && books
              ? `You have added ${books.length} ${books.length === 1 ? "book" : "books"}.`
              : "The books you added to the library."}
          </p>
        </div>
        <Link href="/add-book" className={buttonVariants()}>
          <Plus className="size-4" />
          Add Book
        </Link>
      </div>

      {loading && <PageLoader label="Loading your books..." />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={reload} />
      )}

      {!loading && !error && books.length === 0 && (
        <EmptyState
          title="You have not added any books"
          text="Add your first book and share it with other readers."
          actionHref="/add-book"
          actionLabel="Add Your First Book"
        />
      )}

      {!loading && !error && books.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <MyBookCard
              key={book._id}
              book={book}
              onEdit={setEditingBook}
              onDelete={setDeletingBook}
            />
          ))}
        </div>
      )}

      {editingBook && (
        <EditBookDialog
          key={editingBook._id}
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSaved={handleSaved}
        />
      )}

      {deletingBook && (
        <DeleteBookDialog
          key={deletingBook._id}
          book={deletingBook}
          onClose={() => setDeletingBook(null)}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}