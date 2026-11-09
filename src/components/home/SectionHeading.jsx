import Reveal from "@/components/Reveal";

// The same heading style for every section on the Home page
export default function SectionHeading({ title, text }) {
  return (
    <Reveal className="mb-10 text-center">
      <h2 className="section-title">{title}</h2>
      {text && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{text}</p>
      )}
    </Reveal>
  );
}