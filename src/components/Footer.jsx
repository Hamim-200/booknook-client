import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    XIcon,
} from "@/components/SocialIcons";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
];

const socialLinks = [
    { href: "https://x.com", label: "X", Icon: XIcon },
    { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
    { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
    { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Footer() {
    return (
        <footer className="border-t bg-card">
            <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                    <Logo />
                    <p className="max-w-xs text-sm text-muted-foreground">
                        A small online library where you can add a book, borrow a book, and
                        return a book.
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-base font-semibold text-foreground">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-sm">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-base font-semibold text-foreground">
                        Contact
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Mail className="size-4 shrink-0 text-primary" />
                            support@booknook.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="size-4 shrink-0 text-primary" />
                            +1 555 010 0199
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="size-4 shrink-0 text-primary" />
                            12 Library Lane, Booktown
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-base font-semibold text-foreground">
                        Follow Us
                    </h3>
                    <div className="flex gap-3">
                        {socialLinks.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t">
                <p className="container-page py-4 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BookNook. All rights reserved.
                </p>
            </div>
        </footer>
    );
}