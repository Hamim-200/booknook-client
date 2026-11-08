import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import PageLoader from "@/components/Spinner";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RegisterForm />
    </Suspense>
  );
}