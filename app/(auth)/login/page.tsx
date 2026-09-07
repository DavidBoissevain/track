import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage(props: PageProps<"/login">) {
  // The OAuth callback sends failures back here as ?error=
  const { error } = await props.searchParams;
  const initialError = typeof error === "string" ? error : undefined;

  return <AuthForm mode="login" initialError={initialError} />;
}
