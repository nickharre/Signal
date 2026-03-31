"use client";
import { motion } from "framer-motion";
import { Timer, ShieldCheck, Route } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Intelligent Sequencing",
    body: "If they haven\u2019t opened the Email in 2 hours, then try SMS. Not both.",
  },
  {
    icon: ShieldCheck,
    title: "Sentiment Safeguards",
    body: "Automatically pause marketing pings if a customer has an open \u2018High Priority\u2019 support ticket.",
  },
  {
    icon: Route,
    title: "Channel Affinity",
    body: "Route messages to the channel the user actually clicks on, not the one that\u2019s cheapest for you.",
  },
];

export default function FeatureCards() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold sm:text-4xl"
        >
          Engagement Rules
        </motion.h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-text-muted">
          Declarative rules that protect your customer&rsquo;s attention.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/40"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary-light">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
