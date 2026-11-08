"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useSession } from "@/lib/auth-client";
import { CATEGORIES } from "@/lib/constants";
import { uploadImage, validateImage } from "@/lib/upload";

export default function AddBookForm() {
  // The logged-in user (shown as read-only fields)
  const { data: session } = useSession();
  const user = session?.user;

  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [stage, setStage] = useState("");

  function clearImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(null);
    setPreviewUrl("");
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      clearImage();
      return;
    }

    const problem = validateImage(file);
    if (problem) {
      toast.error(problem);
      event.target.value = "";
      clearImage();
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const title = String(form.get("title")).trim();
    const author = String(form.get("author")).trim();
    const description = String(form.get("description")).trim();
    const totalCopies = Number(form.get("totalCopies"));

    if (!title || !author || !description) {
      return toast.error("Please fill in the title, author and description.");
    }
    if (!category) {
      return toast.error("Please choose a category.");
    }
    if (!imageFile) {
      return toast.error("Please choose a book image.");
    }
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      return toast.error("Total copies must be a whole number of at least 1.");
    }

    setSubmitting(true);
    try {
      // Step 1: upload the image and get its URL
      setStage("Uploading image...");
      const imageUrl = await uploadImage(imageFile);

      // Step 2: save the book in our database through the Express server.
      // Name, email and date are added by the server, not sent from here.
      setStage("Saving book...");
      await apiFetch("/books", {
        auth: true,
        method: "POST",
        body: {
          title,
          author,
          category,
          image: imageUrl,
          description,
          totalCopies,
        },
      });

      toast.success("Book added successfully!");
      formElement.reset();
      setCategory("");
      clearImage();
    } catch (error) {
      toast.error(error.message || "Could not add the book. Please try again.");
    } finally {
      setSubmitting(false);
      setStage("");
    }
  }

  return (
    <div className="container-page py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">Add a New Book</h1>
        <p className="mt-2 text-muted-foreground">
          Share a book with the BookNook community.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Book Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. The Little Prince"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author">Author Name</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="e.g. Antoine de Saint-Exupéry"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="w-full">
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
                <Label htmlFor="totalCopies">Total Copies</Label>
                <Input
                  id="totalCopies"
                  name="totalCopies"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue="1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Book Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleImageChange}
              />
              {previewUrl ? (
                // A plain img is used here because the preview is a local file
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Selected book cover preview"
                  className="mt-2 h-48 w-36 rounded-md border object-cover"
                />
              ) : (
                <div className="mt-2 flex h-48 w-36 flex-col items-center justify-center gap-2 rounded-md border border-dashed text-xs text-muted-foreground">
                  <ImagePlus className="size-6" />
                  No image yet
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WEBP or GIF, up to 5 MB.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                maxLength={300}
                placeholder="What is this book about? (up to 300 characters)"
                required
              />
            </div>

            {/* Read-only: taken from the logged-in user */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="userName">Your Name</Label>
                <Input
                  id="userName"
                  value={user?.name ?? ""}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Your Email</Label>
                <Input
                  id="userEmail"
                  value={user?.email ?? ""}
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting || !user}
            >
              {submitting ? (
                <>
                  <Spinner className="size-4 text-primary-foreground" />
                  {stage || "Adding..."}
                </>
              ) : (
                "Add Book"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}