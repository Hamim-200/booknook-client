"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Circle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/auth/PasswordInput";
import GoogleButton from "@/components/auth/GoogleButton";
import { Spinner } from "@/components/Spinner";
import { signUp } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/redirect";
import { cn } from "@/lib/utils";

// The password rules from the PDF
const passwordRules = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "One uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
];

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function RegisterForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const loginHref =
    redirect !== "/" ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showRuleErrors, setShowRuleErrors] = useState(false);

  const allRulesMet = passwordRules.every((rule) => rule.test(password));

  function showError(message) {
    setFormError(message);
    toast.error(message);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const photo = String(form.get("photo")).trim();

    if (!name) return showError("Please enter your name.");

    if (!isValidUrl(photo)) {
      return showError(
        "Please enter a valid photo URL that starts with http:// or https://"
      );
    }

    if (!allRulesMet) {
      setShowRuleErrors(true);
      return showError(
        "Password must have an uppercase letter, a lowercase letter and at least 6 characters."
      );
    }

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      image: photo,
    });
    setLoading(false);

    if (error) {
      return showError(
        error.message || "Registration failed. Please try again."
      );
    }

    toast.success("Account created! Please log in.");
    router.push(loginHref);
  }

  return (
    <div className="container-page flex justify-center py-12">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="mb-6 text-center">
            <h1 className="section-title text-3xl sm:text-3xl">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join BookNook to add, borrow and return books.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <p
                role="alert"
                className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {formError}
              </p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                name="photo"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <ul className="space-y-1 pt-1 text-xs">
                {passwordRules.map((rule) => {
                  const met = rule.test(password);
                  return (
                    <li
                      key={rule.label}
                      className={cn(
                        "flex items-center gap-2",
                        met
                          ? "text-primary"
                          : showRuleErrors
                            ? "text-destructive"
                            : "text-muted-foreground"
                      )}
                    >
                      {met ? (
                        <Check className="size-3.5" />
                      ) : (
                        <Circle className="size-3.5" />
                      )}
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="size-4 text-primary-foreground" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs uppercase text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <GoogleButton callbackURL="/" />

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={loginHref}
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}