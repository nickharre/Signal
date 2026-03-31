"use client";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 lg:pt-44 lg:pb-36">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/20 blur-[140px]" />

      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl text-center"
      >
        <motion.div variants={fade} className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Universal Contact Strategy
        </motion.div>

        <motion.h1 variants={fade} className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Communicate like you{" "}
          <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            know them.
          </span>
        </motion.h1>

        <motion.p variants={fade} className="mx-auto mt-6 max-w-xl text-lg text-text-muted">
          Stop the &ldquo;siloed blast.&rdquo; Signal acts as the central nervous system for your
          customer communications, ensuring every message is timely, relevant, and respectful of
          your audience&rsquo;s attention.
        </motion.p>

        <motion.div variants={fade} className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-light"
          >
            Start Orchestrating <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#logic-preview"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-text-muted transition hover:text-text hover:border-text-muted"
          >
            <Code2 className="h-4 w-4" /> View the API
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
