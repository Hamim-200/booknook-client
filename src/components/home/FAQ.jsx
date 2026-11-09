import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { LOAN_DAYS } from "@/lib/constants";

const questions = [
  {
    question: "How long can I keep a borrowed book?",
    answer: `Every loan lasts ${LOAN_DAYS} days. The return date is shown on the My Borrows page, and you can return a book at any time with one click.`,
  },
  {
    question: "Do I need an account to use BookNook?",
    answer:
      "You can browse all books without an account. To open a book's details, borrow, or add books, you need to register or log in. Google login works too.",
  },
  {
    question: "What does “Not Available” mean?",
    answer:
      "It means every copy of that book is borrowed right now. As soon as someone returns a copy, the Borrow button works again.",
  },
  {
    question: "Can I borrow the same book twice at the same time?",
    answer:
      "No. You can hold one copy of each book at a time. Return it first, and you can borrow it again later.",
  },
  {
    question: "Can I edit or delete a book?",
    answer:
      "Yes, but only the books you added yourself. Open My Books to update the details or remove a book from the library.",
  },
];

export default function FAQ() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        title="Frequently Asked Questions"
        text="Quick answers to the things readers ask most."
      />

      <Reveal className="mx-auto max-w-3xl space-y-3">
        {questions.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border bg-card px-5 py-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}