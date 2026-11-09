"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/Spinner";
import { apiFetch } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import { uploadImage, validateImage } from "@/lib/upload";

// A form (inside a modal) with the book's old data already filled in.
//   book:    the book being edited
//   onClose: called when the user cancels
//   onSaved: called with the updated book after a successful save
export default function EditBookDialog({ book, onClose, onSaved }) {
  const [category, setCategory] = useState(book.category);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [stage, setStage] = useState("");

  // Copies that are out on loan right now. Total copies cannot go below this.
  const borrowedCopies = book.totalCopies - book.availableCopies;
  const minCopies = Math.max(1, borrowedCopies);

  // Frees the memory of the preview picture when it changes or the modal closes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setImageFile(null);
      setPreviewUrl("");
      return;
    }

    const problem = validateImage(file);
    if (problem) {
      toast.error(problem);
      event.target.value = "";
      setImageFile(null);
      setPreviewUrl("");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const title = String(form.get("title")).trim();
    const author = String(form.get("author")).trim();
    const description = String(form.get("description")).trim();
    const totalCopies = Number(form.get("totalCopies"));

    if (!title || !author || !description) {
      return toast.error("Please fill in the title, author and description.");
    }
    if (!Number.isInteger(totalCopies) || totalCopies < minCopies) {
      return toast.error(
        borrowedCopies > 0
          ? `${borrowedCopies} ${borrowedCopies === 1 ? "copy is" : "copies are"} currently borrowed, so total copies cannot be less than ${minCopies}.`
          : "Total copies must be a whole number of at least 1."
      );
    }

    const unchanged =
      title === book.title &&
      author === book.author &&
      description === book.description &&
      category === book.category &&
      totalCopies === book.totalCopies &&
      !imageFile;

    if (unchanged) {
      toast.info("No changes to save.");
      return onClose();
    }

    setSaving(true);
    try {
      // Keep the old image unless the user chose a new one
      let image = book.image;
      if (imageFile) {
        setStage("Uploading image...");
        image = await uploadImage(imageFile);
      }

      setStage("Saving changes...");
      const updated = await apiFetch(`/books/${book._id}`, {
        auth: true,
        method: "PATCH",
        body: { title, author, category, image, description, totalCopies },
      });

      toast.success("Book updated successfully!");
      onSaved(updated);
    } catch (error) {
      toast.error(error.message || "Could not update the book.");
      setSaving(false);
      setStage("");
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        // Do not let the modal close while saving
        if (!open && !saving) onClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
          <DialogDescription>
            Change the details below and save. Leave the image as it is to keep
            the current cover.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Book Title</Label>
              <Input
                id="edit-title"
                name="title"
                defaultValue={book.title}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-author">Author Name</Label>
              <Input
                id="edit-author"
                name="author"
                defaultValue={book.author}
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="edit-category" className="w-full">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-copies">Total Copies</Label>
              <Input
                id="edit-copies"
                name="totalCopies"
                type="number"
                min={minCopies}
                step="1"
                defaultValue={book.totalCopies}
                required
              />
              {borrowedCopies > 0 && (
                <p className="text-xs text-muted-foreground">
                  {borrowedCopies}{" "}
                  {borrowedCopies === 1 ? "copy is" : "copies are"} borrowed
                  right now, so the minimum is {minCopies}.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-image">Book Image</Label>
            <Input
              id="edit-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
            />
            {/* Shows the new image if one was chosen, otherwise the current cover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl || book.image}
              alt={previewUrl ? "New cover preview" : "Current cover"}
              className="mt-2 h-40 w-32 rounded-md border object-cover"
            />
            <p className="text-xs text-muted-foreground">
              {previewUrl
                ? "This new image will replace the current cover."
                : "Current cover. Choose a file to replace it."}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Short Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={4}
              maxLength={300}
              defaultValue={book.description}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Spinner className="size-4 text-primary-foreground" />
                  {stage || "Saving..."}
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}