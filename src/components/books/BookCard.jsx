import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BookCard({ book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
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
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            by {book.author}
          </p>
        </div>

        <Link
          href={`/books/${book._id}`}
          className={cn(buttonVariants(), "mt-auto w-full")}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}