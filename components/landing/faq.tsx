import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/site";

const faqs = [
  {
    question: `What is ${site.name} for?`,
    answer:
      "It helps you see how many hours you have already put into each project this week or month, so you spread your time the way you planned. It is not there to squeeze more hours out of you. It is there so you notice when a project is getting too little attention, or too much.",
  },
  {
    question: "Is this a timer?",
    answer:
      "No. Nothing runs in the background. You type in the hours you did, the same way you would fill in a sheet at the end of the day.",
  },
  {
    question: "Do I work in hours or in days?",
    answer:
      "You fill in hours, because that is how the day actually breaks up. Capacity you can set in days, and if you would rather set it in hours you can do that too.",
  },
  {
    question: "Can I set capacity per week and per month?",
    answer:
      "Yes. Some projects are easier to think about per week, like two days a week. Others make more sense per month, like four days a month. You pick that per project.",
  },
  {
    question: "What happens if I go over?",
    answer:
      "Red sticks out above the top of the bar for the hours you did too much, so you spot it right away. Nothing gets blocked and nobody gets told. It is there so you can adjust.",
  },
  {
    question: "Why are some bars taller than others?",
    answer:
      "Because the height is the capacity you gave that project. A project you set to four days a week gets a bar twice as tall as one you set to two days a week. That way you see which projects are the big ones without reading any numbers.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Yes. Your hours are saved to your account so you can open them on your laptop and on your phone and carry on where you stopped. Signing up takes an email and nothing else.",
  },
  {
    question: "What happens with my data?",
    answer:
      "Your projects and hours are stored so you can get them back later. That is the only reason we keep them. There are no ad trackers, no analytics following you around, and nothing is sold or shared. Delete your account and it all goes with it.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yes. No paid plan, no trial that runs out, and no features locked behind a wall. It is a hobby project, built because the tools I tried were either too heavy or too expensive for what I needed.",
  },
];

export function Faq() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            If something is still unclear, send me a message on LinkedIn and I
            will add it here.
          </p>
          <div className="flex justify-center pt-4">
            {/* unoptimized: the image optimizer refuses SVG unless
                dangerouslyAllowSVG is on, and this is a local trusted asset. */}
            <Image
              src="/undraw_question.svg"
              alt="People with question marks"
              width={500}
              height={400}
              unoptimized
              className="h-auto w-full max-w-md"
            />
          </div>
        </div>

        <Accordion className="gap-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="rounded-lg border border-slate-200 bg-white px-6 not-last:border-b dark:border-slate-700 dark:bg-slate-800/50"
            >
              <AccordionTrigger className="cursor-pointer py-5 text-lg font-semibold text-slate-900 hover:no-underline dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
