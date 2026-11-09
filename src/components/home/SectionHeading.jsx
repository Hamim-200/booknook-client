import Reveal from "@/components/Reveal";

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