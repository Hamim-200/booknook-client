// Used by the Add Book form now, and by the Edit form and filters later
export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

// How many days a book can be borrowed.
// This is only for showing the date in the borrow modal.
// The server calculates the real return date (it uses 7 days too).
export const LOAN_DAYS = 7;