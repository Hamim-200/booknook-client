import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import PageLoader from "@/components/Spinner";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginForm />
    </Suspense>
  );
}