import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className }) {
  return (
    <Loader2
      className={cn("size-6 animate-spin text-primary", className)}
      aria-hidden="true"
    />
  );
}

export default function PageLoader({ label = "Loading..." }) {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3"
      role="status"
    >
      <Spinner className="size-10" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}