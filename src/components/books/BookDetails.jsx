"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookMarked, CalendarDays, UserRound } from "lucide-react";
import BorrowDialog from "@/components/borrows/BorrowDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/Spinner";
import { EmptyState, ErrorState } from "@/components/StateMessages";
import { useApiData } from "@/hooks/useApiData";
import { formatDate } from "@/lib/format";

export default function BookDetails({ id }) {
  const {
    data: book,
    error,
    loading,
    reload,
    setData,
  } = useApiData(`/books/${encodeURIComponent(id)}`, { auth: true });

  const [borrowOpen, setBorrowOpen] = useState(false);

  function handleBorrowed() {
    setData((current) => ({
      ...current,
      availableCopies: current.availableCopies - 1,
    }));
    setBorrowOpen(false);
  }

  function handleConflict() {
    setBorrowOpen(false);
    reload();
  }

  if (loading) {
    return (
      <div className="container-page py-12">
        <PageLoader label="Loading book..." />
      </div>
    );
  }

  if (error) {
    const notFound = error.status === 400 || error.status === 404;
    return (
      <div className="container-page py-12">
        {notFound ? (
          <EmptyState
            title="Book not found"
            text="This book does not exist or was removed."
            actionHref="/books"
            actionLabel="Browse All Books"
          />
        ) : (
          <ErrorState message={error.message} onRetry={reload} />
        )}
      </div>
    );
  }

  const available = book.availableCopies > 0;

  return (
    <div className="container-page py-12">
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to All Books
      </Link>

      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl border bg-muted md:max-w-none">
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{book.category}</Badge>
            {available ? (
              <Badge variant="outline">
                {book.availableCopies} of {book.totalCopies} copies available
              </Badge>
            ) : (
              <Badge variant="destructive">Not Available</Badge>
            )}
          </div>

          <div>
            <h1 className="section-title break-words">{book.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              by {book.author}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              About this book
            </h2>
            <p className="whitespace-pre-line break-words leading-relaxed text-muted-foreground">
              {book.description}
            </p>
          </div>

          <div className="grid gap-3 rounded-xl border bg-card p-5 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-muted-foreground">Added by</p>
                <p className="font-medium text-foreground">
                  {book.addedByName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {book.addedByEmail}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-muted-foreground">Added on</p>
                <p className="font-medium text-foreground">
                  {formatDate(book.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div>
            {available ? (
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setBorrowOpen(true)}
              >
                <BookMarked className="size-5" />
                Borrow This Book
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto" disabled>
                Not Available
              </Button>
            )}
          </div>
        </div>
      </div>

      {borrowOpen && (
        <BorrowDialog
          book={book}
          onClose={() => setBorrowOpen(false)}
          onBorrowed={handleBorrowed}
          onConflict={handleConflict}
        />
      )}
    </div>
  );
}