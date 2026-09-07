import type { Metadata } from "next";
import Link from "next/link";

import { AppSwitcher } from "@/components/app-switcher";
import { Logo } from "@/components/pointly-logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy and terms of use for Pointly Track. What is stored, where it lives, and how to get rid of it. No tracking, no ads, no selling.",
  alternates: { canonical: "/privacy" },
};

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
      />
      <span>{children}</span>
    </li>
  );
}

export default function PrivacyPage() {
  const mailto = `mailto:${site.author.email}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="flex items-center justify-between p-6">
        <Logo href="/" textClassName="text-slate-900 dark:text-white" />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <AppSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-4 pb-12">
        <div className="space-y-6 rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-sm md:p-8 dark:bg-slate-800/80">
          <div className="space-y-2 border-b border-slate-200 pb-4 text-center dark:border-slate-700">
            <h1 className="bg-linear-to-r from-brand-strong via-brand to-sky-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Terms of use and data practices
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Privacy and data
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Privacy matters, even for a small free project. Pointly Track
              needs an account so your hours are still there tomorrow and on
              your other device. That is the only reason anything is kept. Here
              is exactly what happens with it.
            </p>

            <div className="space-y-4 pl-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  What gets collected
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>
                    <strong>Your email address.</strong> Either the one you type
                    when you register, or the one on the Google account you sign
                    in with. It identifies your account and nothing else.
                  </Bullet>
                  <Bullet>
                    <strong>Your password</strong>, only if you register with an
                    email and password. It is hashed by Supabase before it is
                    stored. It is never kept as readable text and I cannot see
                    it.
                  </Bullet>
                  <Bullet>
                    <strong>A Google account id</strong>, only if you choose to
                    sign in with Google. Google is asked for your email address
                    and basic profile, nothing more. No contacts, no calendar,
                    no files.
                  </Bullet>
                  <Bullet>
                    <strong>Your projects, capacities and hours</strong>, once
                    that part of the app is built. At the time of writing the
                    tracking screens do not exist yet, so there is nothing of
                    yours in the database beyond your account.
                  </Bullet>
                  <Bullet>
                    <strong>A sign-in cookie.</strong> It keeps you logged in
                    between visits. Without it you would have to sign in on
                    every page.
                  </Bullet>
                  <Bullet>
                    <strong>Standard server logs.</strong> The hosting providers
                    see things like your IP address and the time of a request as
                    part of running any website.
                  </Bullet>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  What does not get collected
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>No analytics and no tracking scripts</Bullet>
                  <Bullet>No advertising and no ad cookies</Bullet>
                  <Bullet>
                    No cookies at all beyond the one that keeps you signed in
                  </Bullet>
                  <Bullet>No profiling and no third party trackers</Bullet>
                  <Bullet>
                    Your data is never sold, rented or shared for marketing
                  </Bullet>
                </ul>
                <p className="mt-3 text-slate-600 italic dark:text-slate-400">
                  There is no cookie banner because there is nothing to consent
                  to. The only cookie is the one that signs you in, which is
                  strictly necessary and exempt.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Where your data goes
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>
                    <strong>Vercel</strong> hosts the site. Vercel sees standard
                    server logs such as IP addresses and timestamps.
                  </Bullet>
                  <Bullet>
                    <strong>Supabase</strong> handles accounts, sign in and the
                    database. Your email address, your hashed password and, in
                    time, your projects and hours live there.
                  </Bullet>
                  <Bullet>
                    <strong>Google</strong>, only if you pick Google sign in. In
                    that case Google tells this app your email address and
                    account id, and Google knows you signed in here.
                  </Bullet>
                </ul>
                <p className="mt-3 text-slate-600 italic dark:text-slate-400">
                  These are the only three. Each has its own privacy policy
                  worth reading if you want the full picture of what an
                  infrastructure provider sees.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  When your data disappears
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>
                    Ask for your account to be deleted and it goes, along with
                    everything attached to it. Nothing is kept back.
                  </Bullet>
                  <Bullet>
                    There is no delete button in the app yet. Until there is,
                    email{" "}
                    <a
                      href={mailto}
                      className="font-medium text-brand underline-offset-4 hover:underline"
                    >
                      {site.author.email}
                    </a>{" "}
                    and it will be done by hand.
                  </Bullet>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your rights
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              You can ask for any of the following, and it will be done without
              fuss:
            </p>
            <ul className="space-y-2 pl-4 text-slate-700 dark:text-slate-300">
              <Bullet>A copy of everything held about you</Bullet>
              <Bullet>A correction, if something is wrong</Bullet>
              <Bullet>Deletion of your account and all of its data</Bullet>
            </ul>
            <p className="text-slate-600 italic dark:text-slate-400">
              If you are in the EU, the GDPR gives you these rights, plus the
              right to complain to your national data protection authority if
              you think your data has been misused.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Security
            </h2>
            <ul className="space-y-2 pl-4 text-slate-700 dark:text-slate-300">
              <Bullet>Everything travels over an encrypted connection</Bullet>
              <Bullet>
                Passwords are hashed by Supabase and never stored as readable
                text
              </Bullet>
              <Bullet>
                Sign-in tokens are verified on the server on every request,
                not simply trusted
              </Bullet>
            </ul>
            <p className="text-slate-600 italic dark:text-slate-400">
              That said, this is a free project run by one person, not a bank.
              Use a password you do not use anywhere else, and do not put
              anything confidential in a project name.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Terms of use
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  As a free project, this tool
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>Costs nothing and always will</Bullet>
                  <Bullet>
                    Comes with no warranty and no promise about uptime
                  </Bullet>
                  <Bullet>May have bugs and may be down sometimes</Bullet>
                  <Bullet>
                    May change or stop existing without notice, though you would
                    get the chance to take your data with you
                  </Bullet>
                  <Bullet>
                    Should not be relied on for anything critical, such as
                    billing a client
                  </Bullet>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                  Please do not
                </h3>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <Bullet>Try to hack, abuse or disrupt the service</Bullet>
                  <Bullet>Use it for anything illegal or harmful</Bullet>
                  <Bullet>
                    Create accounts in bulk or hammer it with automated requests
                  </Bullet>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Minors
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              This tool is not aimed at children. If you are under 16, ask a
              parent before making an account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Changes
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              This page will change as the app grows, and the date below moves
              with it. Anything that meaningfully changes what happens to your
              data will show up here first.
            </p>
            <p className="font-semibold text-slate-600 dark:text-slate-400">
              Last updated: {site.privacyUpdated}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Contact
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              Questions, worries or a deletion request? Send an email and you
              will get a real reply.
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Email:</strong>{" "}
              <a
                href={mailto}
                className="text-brand underline-offset-4 hover:underline"
              >
                {site.author.email}
              </a>
            </p>
          </section>

          <section className="space-y-4 border-t border-slate-200 pt-6 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Disclaimer
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              This tool is provided as is, with no warranty of any kind. No
              liability is accepted for data loss or for problems arising from
              using it. It is a free project, so please set your expectations
              accordingly. By using it you agree to what is written on this
              page.
            </p>
          </section>

          <div className="pt-4 text-center">
            <Button
              render={<Link href="/" />}
              nativeButton={false}
              className="h-auto cursor-pointer rounded-xl bg-linear-to-r from-brand to-brand-strong px-8 py-4 text-lg font-semibold text-brand-foreground shadow-lg transition-all hover:shadow-xl"
            >
              Back to home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
