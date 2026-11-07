import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
    return (
        <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="BookNook home"
        >
            <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
                <BookOpen className="size-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -right-1 -top-1 size-4 rounded-full bg-amber-400 opacity-90" />
            </span>

            <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
                Book
                <span className="text-primary">Nook</span>

            </span>
        </Link>
    );
}