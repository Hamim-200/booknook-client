import Link from "next/link";
import { AlertTriangle, BookX } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Shown when loading data fails (server down, bad token, and so on)
export function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
    >
      <AlertTriangle className="size-10 text-destructive" />
      <h2 className="text-xl font-semibold text-foreground">
        We could not load this
      </h2>
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

// Shown when there is nothing to display yet
export function EmptyState({ title, text, actionHref, actionLabel }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center">
      <BookX className="size-10 text-muted-foreground" />
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
      {actionHref && (
        <Link
          href={actionHref}
          className={cn(buttonVariants(), "mt-2")}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}