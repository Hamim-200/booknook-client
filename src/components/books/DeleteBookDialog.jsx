"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { apiFetch } from "@/lib/api";

// The confirm modal that replaces the browser's confirm() box.
//   book:      the book the user wants to delete
//   onClose:   called when the user cancels
//   onDeleted: called after the book is deleted (receives the book id)
export default function DeleteBookDialog({ book, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await apiFetch(`/books/${book._id}`, { auth: true, method: "DELETE" });
      toast.success("Book deleted successfully");
      onDeleted(book._id);
    } catch (error) {
      toast.error(error.message || "Could not delete the book.");
      setDeleting(false);
    }
  }

  return (
    <AlertDialog
      open
      onOpenChange={(open) => {
        // Do not let the modal close while the delete is running
        if (!open && !deleting) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            <strong className="text-foreground">{book.title}</strong> will be
            permanently deleted, and any borrow records for it will be removed
            too. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" disabled={deleting} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? (
              <>
                <Spinner className="size-4 text-destructive" />
                Deleting...
              </>
            ) : (
              "Yes, delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}