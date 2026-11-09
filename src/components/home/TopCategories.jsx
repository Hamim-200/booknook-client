import { Baby, FlaskConical, Landmark, Shapes, Sparkles } from "lucide-react";
import SectionHeading from "@/components/home/SectionHeading";
import Reveal from "@/components/Reveal";
import { CATEGORIES } from "@/lib/constants";

// An icon and a short line for each category
const categoryInfo = {
  Fiction: { Icon: Sparkles, text: "Novels and stories to get lost in." },
  Science: { Icon: FlaskConical, text: "Explore how the world works." },
  History: { Icon: Landmark, text: "Learn about people and times gone by." },
  Kids: { Icon: Baby, text: "Fun reads for young readers." },
  Others: { Icon: Shapes, text: "Everything else worth reading." },
};

export default function TopCategories() {
  return (
    <section className="container-page py-16">
      <SectionHeading
        title="Top Categories"
        text="Whatever you enjoy, there is a shelf for it."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map((category, index) => {
          const { Icon, text } = categoryInfo[category];
          return (
            <Reveal key={category} delay={index * 0.08} className="h-full">
              <div className="flex h-full flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center shadow-sm">
                <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-7" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {category}
                </h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}