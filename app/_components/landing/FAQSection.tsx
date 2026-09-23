"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "@/app/_components/motion/FadeIn";

const faqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. Pick a template, fill in a few forms — about, projects, experience, contact — and Portfolium builds the page for you.",
  },
  {
    question: "How do I sign in?",
    answer:
      "With your Google account. No separate password to create or remember.",
  },
  {
    question: "Can I change my template later?",
    answer:
      "Yes — switch templates anytime from your profile. Your content carries over.",
  },
  {
    question: "Where does my portfolio live?",
    answer:
      "Every profile is published at a public link built from your username, so you can share it on your resume, LinkedIn, or anywhere else.",
  },
  {
    question: "Is Portfolium free?",
    answer: "Yes — Portfolium is free to use.",
  },
  {
    question: "Can I add images to my projects?",
    answer:
      "Yes — upload a hero image and images for each project directly from the editor.",
  },
];

const FAQSection = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <FadeIn className="text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </section>
  );
};

export default FAQSection;
