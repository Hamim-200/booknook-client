import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy" };

const CONTACT_EMAIL = "hamim.ahmed541@gmail.com";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 9, 2026">
      <p>
        BookNook is a small online library where members add, borrow and return
        books. This page explains what information we collect, why we collect
        it, and the choices you have.
      </p>

      <LegalSection title="Information we collect">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong className="text-foreground">Account details:</strong> your
            name, email address, profile photo link and password. Passwords are
            stored in a scrambled (hashed) form, never as plain text.
          </li>
          <li>
            <strong className="text-foreground">Library activity:</strong> the
            books you add, including their title, author, category, description
            and cover image, and the books you borrow, with the borrow and
            return dates.
          </li>
          <li>
            <strong className="text-foreground">Login session:</strong> a
            cookie that keeps you logged in while you use the site.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Signing in with Google">
        <p>
          If you choose &ldquo;Continue with Google&rdquo;, Google shares your
          name, email address and profile picture with us. We use them only to
          create and run your BookNook account. We do not use Google user data
          for advertising, and we do not sell it or share it with anyone else.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <ul className="list-disc space-y-1 pl-6">
          <li>To create your account and keep you logged in.</li>
          <li>To show who added a book and who borrowed it.</li>
          <li>To keep track of available copies and return dates.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Who can see your information">
        <p>
          Other logged-in members can see the name and email address of the
          person who added a book on its details page. Your borrowed books are
          visible only to you. We do not sell your information.
        </p>
      </LegalSection>

      <LegalSection title="Services we use">
        <p>
          BookNook is hosted on Vercel, stores its data in MongoDB Atlas, and
          stores book cover images with imgbb. These services process your
          information only to run the website for us.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          You can edit or delete the books you added from the My Books page and
          return borrowed books from the My Borrows page. To have your account
          and its data deleted, email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we change this policy, we will update the date at the top of this
          page.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about privacy? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}