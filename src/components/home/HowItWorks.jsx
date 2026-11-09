import { BookMarked, Search, Undo2, UserPlus } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { LOAN_DAYS } from "@/lib/constants";

const steps = [
  {
    Icon: UserPlus,
    title: "Create an account",
    text: "Register for free or continue with Google. It takes less than a minute.",
  },
  {
    Icon: Search,
    title: "Find a book",
    text: "Browse the whole library and open a book to read its details.",
  },
  {
    Icon: BookMarked,
    title: "Borrow it",
    text: `Confirm your loan in one click. You can keep the book for ${LOAN_DAYS} days.`,
  },
  {
    Icon: Undo2,
    title: "Return it",
    text: "Done reading? Press Return Book and the next reader can borrow it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y bg-card/50 py-16">
      <div className="container-page">
        <SectionHeading
          title="How Borrowing Works"
          text="Four simple steps from sign up to your next favorite read."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}