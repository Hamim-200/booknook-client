import BookDetails from "@/components/books/BookDetails";

export const metadata = { title: "Book Details" };

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  return <BookDetails id={id} />;
}