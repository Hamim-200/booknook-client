"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageLoader, { Spinner } from "@/components/Spinner";
import { EmptyState, ErrorState } from "@/components/StateMessages";
import { useApiData } from "@/hooks/useApiData";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";

export default function MyBorrows() {
  const {
    data: borrows,
    error,
    loading,
    reload,
    setData,
  } = useApiData("/borrows", { auth: true });

  const [returningId, setReturningId] = useState(null);

  async function handleReturn(borrow) {
    setReturningId(borrow._id);
    try {
      await apiFetch(`/borrows/${borrow._id}`, {
        auth: true,
        method: "DELETE",
      });
      toast.success(`"${borrow.bookTitle}" was returned. Thank you!`);
      setData((list) => list.filter((item) => item._id !== borrow._id));
    } catch (error) {
      toast.error(error.message || "Could not return the book.");
      if (error.status === 404) {
        setData((list) => list.filter((item) => item._id !== borrow._id));
      }
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="container-page py-12">
      <div className="mb-10 text-center">
        <h1 className="section-title">My Borrows</h1>
        <p className="mt-2 text-muted-foreground">
          {!loading && !error && borrows
            ? `You have borrowed ${borrows.length} ${borrows.length === 1 ? "book" : "books"}.`
            : "The books you have borrowed."}
        </p>
      </div>

      {loading && <PageLoader label="Loading your borrowed books..." />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={reload} />
      )}

      {!loading && !error && borrows.length === 0 && (
        <EmptyState
          title="No borrowed books yet"
          text="Find a book you like and borrow it for a few days."
          actionHref="/books"
          actionLabel="Browse Books"
        />
      )}

      {!loading && !error && borrows.length > 0 && (
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Borrow Date</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrows.map((borrow) => (
                <TableRow key={borrow._id}>
                  <TableCell>
                    <div className="relative h-16 w-12 overflow-hidden rounded border bg-muted">
                      <Image
                        src={borrow.bookImage}
                        alt={`Cover of ${borrow.bookTitle}`}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[16rem] whitespace-normal font-medium">
                    <Link
                      href={`/books/${borrow.bookId}`}
                      className="line-clamp-2 transition-colors hover:text-primary"
                    >
                      {borrow.bookTitle}
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(borrow.borrowDate, "short")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(borrow.returnDate, "short")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={returningId === borrow._id}
                      onClick={() => handleReturn(borrow)}
                    >
                      {returningId === borrow._id ? (
                        <>
                          <Spinner className="size-4" />
                          Returning...
                        </>
                      ) : (
                        <>
                          <Undo2 className="size-4" />
                          Return Book
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}