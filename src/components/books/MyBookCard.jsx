import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MyBookCard({ book, onEdit, onDelete }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="relative aspect-[4/5] w-full bg-muted">
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="secondary" className="w-fit">
          {book.category}
        </Badge>

        <div>
          <h3 className="line-clamp-2 min-h-[3.1rem] text-lg font-semibold leading-snug text-foreground">
            <Link
              href={`/books/${book._id}`}
              className="transition-colors hover:text-primary"
            >
              {book.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            by {book.author}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          {book.availableCopies} of {book.totalCopies} copies available
        </p>

        {/* mt-auto keeps the buttons at the bottom of every card */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" onClick={() => onEdit(book)}>
            <Pencil className="size-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(book)}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}