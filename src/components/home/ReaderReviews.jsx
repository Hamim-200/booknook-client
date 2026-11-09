import { Star } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";

const reviews = [
  {
    name: "Amina Rahman",
    role: "University student",
    text: "I found three books for my course in one evening. Borrowing takes one click and returning is just as easy.",
  },
  {
    name: "Daniel Kim",
    role: "Weekend reader",
    text: "I added my old novels and now other readers are enjoying them. It feels like a real neighborhood library.",
  },
  {
    name: "Sofia Martins",
    role: "Parent of two",
    text: "My kids love the Kids shelf. The short loan period is just right for bedtime stories.",
  },
];

// Turns "Amina Rahman" into "AR"
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReaderReviews() {
  return (
    <section className="border-y bg-card/50 py-16">
      <div className="container-page">
        <SectionHeading
          title="Reader Reviews"
          text="See what our community says about borrowing on BookNook."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.1} className="h-full">
              <figure className="flex h-full flex-col gap-5 rounded-xl border bg-card p-6 shadow-sm">
                <div
                  className="flex gap-1"
                  role="img"
                  aria-label="Rated 5 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="size-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                <blockquote className="flex-1 text-muted-foreground">
                  “{review.text}”
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                    {getInitials(review.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {review.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {review.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}