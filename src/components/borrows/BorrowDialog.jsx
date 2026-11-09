"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Spinner";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { LOAN_DAYS } from "@/lib/constants";
import { formatDate } from "@/lib/format";

// The modal with the borrow form.
//   book:       the book to borrow
//   onClose:    called when the user cancels
//   onBorrowed: called after the book was borrowed
//   onConflict: called when the server says "already borrowed" or "not available"
export default function BorrowDialog({
  book,
  onClose,
  onBorrowed,
  onConflict,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [submitting, setSubmitting] = useState(false);

  // Shown for information only. The server works out the real return date.
  const [returnBy] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + LOAN_DAYS);
    return date;
  });

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Only the book id is sent. The server takes your name and email
      // from your login token, so nobody can borrow in someone else's name.
      const borrow = await apiFetch("/borrows", {
        auth: true,
        method: "POST",
        body: { bookId: book._id },
      });

      toast.success(`You borrowed "${book.title}"`, {
        description: `Please return it by ${formatDate(borrow.returnDate)}.`,
        action: {
          label: "My Borrows",
          onClick: () => router.push("/my-borrows"),
        },
      });
      onBorrowed();
    } catch (error) {
      toast.error(
        error.message || "Could not borrow the book. Please try again."
      );
      setSubmitting(false);
      // 409 = already borrowed, or the last copy was just taken
      if (error.status === 409) onConflict();
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        // Do not let the modal close while the request is running
        if (!open && !submitting) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow this book</DialogTitle>
          <DialogDescription>
            You are borrowing{" "}
            <strong className="text-foreground">{book.title}</strong>. Please
            return it within {LOAN_DAYS} days, by {formatDate(returnBy)}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="borrow-name">Your Name</Label>
            <Input
              id="borrow-name"
              value={user?.name ?? ""}
              readOnly
              className="bg-muted/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrow-email">Your Email</Label>
            <Input
              id="borrow-email"
              value={user?.email ?? ""}
              readOnly
              className="bg-muted/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting || !user}>
              {submitting ? (
                <>
                  <Spinner className="size-4 text-primary-foreground" />
                  Borrowing...
                </>
              ) : (
                "Confirm Borrow"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}