import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="BookNook home"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <BookOpen className="size-5" />
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        BookNook
      </span>
    </Link>
  );
}