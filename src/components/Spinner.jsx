import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// A small spinning icon, for buttons or small areas
export function Spinner({ className }) {
  return (
    <Loader2
      className={cn("size-6 animate-spin text-primary", className)}
      aria-hidden="true"
    />
  );
}

// A big centered spinner, for whole pages while data loads
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