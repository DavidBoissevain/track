"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { signIn, signUp, type AuthState } from "@/app/(auth)/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/client";

const copy = {
  login: {
    title: "Sign in",
    submit: "Sign in",
    switchText: "New here?",
    switchLink: "Create an account",
    switchHref: "/register",
    autoComplete: "current-password",
  },
  register: {
    title: "Create your account",
    submit: "Create account",
    switchText: "Already have an account?",
    switchLink: "Sign in",
    switchHref: "/login",
    autoComplete: "new-password",
  },
} as const;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-11 w-full cursor-pointer rounded-xl bg-linear-to-r from-brand to-brand-strong text-base font-semibold text-brand-foreground shadow-md transition-all hover:shadow-lg"
    >
      {pending ? <Spinner className="size-4" /> : null}
      {label}
    </Button>
  );
}

export function AuthForm({
  mode,
  initialError,
}: {
  mode: "login" | "register";
  /** Failures handed back by the OAuth callback as ?error= */
  initialError?: string;
}) {
  const text = copy[mode];
  const [state, formAction] = useActionState<AuthState, FormData>(
    mode === "login" ? signIn : signUp,
    initialError ? { error: initialError } : null,
  );
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [googlePending, setGooglePending] = useState(false);

  async function signInWithGoogle() {
    setGoogleError(null);
    setGooglePending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      // On success the browser is already navigating away, so only a failure
      // ever gets this far.
      if (error) {
        setGoogleError(error.message);
        setGooglePending(false);
      }
    } catch {
      setGoogleError("Could not reach Google. Try again.");
      setGooglePending(false);
    }
  }

  const error = state?.error ?? googleError;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {text.title}
      </h1>

      <Button
        type="button"
        variant="outline"
        onClick={signInWithGoogle}
        disabled={googlePending}
        className="h-11 w-full cursor-pointer gap-3 rounded-xl border-slate-200 text-base font-medium dark:border-slate-700"
      >
        {googlePending ? (
          <Spinner className="size-4" />
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.63h6.2a5.3 5.3 0 0 1-2.3 3.48v2.89h3.72c2.18-2 3.44-4.96 3.44-8.55Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.11 0 5.72-1.03 7.62-2.8l-3.72-2.88c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.71v2.98A11.99 11.99 0 0 0 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.55 14.68a7.2 7.2 0 0 1 0-4.6V7.1H1.71a12 12 0 0 0 0 10.56l3.84-2.98Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.19 15.1 0 12 0 7.48 0 3.57 2.59 1.71 6.36l3.84 2.98C6.46 6.77 9 4.75 12 4.75Z"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400 dark:text-slate-500">or</span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={text.autoComplete}
            required
            minLength={mode === "register" ? 8 : undefined}
            className="h-11"
          />
          {mode === "register" ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              At least 8 characters.
            </p>
          ) : null}
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <SubmitButton label={text.submit} />
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        {text.switchText}{" "}
        <Link
          href={text.switchHref}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          {text.switchLink}
        </Link>
      </p>
    </div>
  );
}
