# BookNook

**Live site:** https://booknook-client-indol.vercel.app

BookNook is a small online library. The idea is simple: **add a book, borrow a book, return a book.** Members share their own books, borrow them for a few days, and return them with one click.

## Features

- **Browse the library:** a public All Books page with equal-height cards in a responsive grid, plus a New Arrivals section on the home page showing the latest six books.
- **Add your own books:** a form with title, author, category, description, total copies and a cover image that is uploaded securely to imgbb through a server route (the API key never reaches the browser).
- **Manage your books:** a My Books page where you can edit a book (the form opens with the old data filled in) or delete it after a confirm modal.
- **Borrow and return:** borrow a book for 7 days from a modal, see all your loans in a table, and return a book in one click.
- **Smart availability:** copies go down on borrow and up on return. A book with no copies left shows a disabled "Not Available" button, and nobody can borrow the same book twice at the same time.
- **Secure login:** email and password or Google sign-in with Better Auth and the MongoDB adapter, private routes that send you back to the page you wanted after login, and JWT-protected API routes.
- **Polished experience:** dark and light theme, Framer Motion animations, a Swiper banner on the home page, toast messages for every success and error, loading spinners, and a custom 404 page.

## Tech stack

- **Client:** Next.js (App Router), React, Tailwind CSS, shadcn/ui, Swiper, Framer Motion, Lucide icons
- **Authentication:** Better Auth with the MongoDB adapter, JWT plugin, Google OAuth
- **Server:** Express.js and MongoDB ([server repository](https://github.com/Hamim-200/booknook-server))
- **Hosting:** Vercel (client and server), MongoDB Atlas (database)

## Repositories

- Client: https://github.com/Hamim-200/booknook-client
- Server: https://github.com/Hamim-200/booknook-server
- Live API: https://booknook-server-bay.vercel.app
