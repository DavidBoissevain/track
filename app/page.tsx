import type { Metadata } from "next";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CapacityPreview,
  exampleWeek,
} from "@/components/landing/capacity-preview";
import { EntryPreview } from "@/components/landing/entry-preview";
import { Faq } from "@/components/landing/faq";
import { StatsPlaceholder } from "@/components/landing/stats-placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} - Free Hour Tracking Against Your Capacity`,
  description: site.description,
};

const promises = [
  "No timers, just the hours you did",
  "Capacity per week or per month",
  "Free, no ads, no tracking",
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Time Tracking",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: site.description,
    url: site.url,
    author: {
      "@type": "Person",
      name: site.author.name,
    },
    featureList: [
      "Log hours per project per day",
      "Set capacity per project in days or hours",
      "Weekly and monthly capacity view",
      "Over capacity warning",
      "Free with no paywall",
      "No advertising or tracking",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <SiteHeader />

        <main className="flex flex-grow flex-col items-center px-6 pb-32">
          {/* Hero */}
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 py-12 md:grid-cols-[3fr_5fr] md:py-20 lg:gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl dark:text-white">
                  Your capacity, at a glance.
                </h1>
                <p className="text-lg leading-relaxed text-slate-500 md:text-xl dark:text-slate-400">
                  Log the hours you did per project and see straight away which
                  ones are short and which ones are over.
                </p>
              </div>

              <ul className="space-y-4">
                {promises.map((promise) => (
                  <li key={promise} className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-brand" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {promise}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-2">
                <Button
                  disabled
                  className="h-auto rounded-2xl bg-linear-to-r from-brand to-brand-strong px-8 py-4 text-lg font-semibold text-brand-foreground shadow-lg"
                >
                  Coming soon
                </Button>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Still being built. Check back soon.
                </p>
              </div>
            </div>

            <div className="relative lg:pl-8">
              <CapacityPreview />
            </div>
          </div>

          <StatsPlaceholder />

          <div className="mt-24 w-full max-w-7xl border-t border-slate-200 dark:border-slate-700" />

          {/* Features */}
          <div className="mx-auto max-w-7xl space-y-24 px-6 pt-24 pb-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Track your hours
                </h2>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  At the end of the day or week you type how many hours went to which
                  project. No start button, no stop button, and no timer running
                  in the background that you forgot about.
                </p>
              </div>
              <EntryPreview />
            </div>

            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <CapacityPreview
                  title="This week"
                  subtitle="Mon 2 Mar to Fri 6 Mar"
                  rows={exampleWeek}
                  showLegend={false}
                />
              </div>
              <div className="order-1 space-y-6 md:order-2">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                  See where you stand
                </h2>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  Every project gets a bar. Grey is what is left, blue is what
                  you did, and red sticks out on top for what you did too much
                  of. One look tells you where to put your time tomorrow.
                </p>
              </div>
            </div>
          </div>

          <Faq />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
