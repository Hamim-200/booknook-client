import BookCard from "@/components/books/BookCard";

// 1 card per row on phones, 2 on tablets, 3 on desktop (as the PDF asks)
export default function BookGrid({ books }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}