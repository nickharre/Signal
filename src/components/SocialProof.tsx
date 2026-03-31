"use client";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-10 text-center sm:flex-row sm:text-left"
      >
        <div className="flex-shrink-0 rounded-xl bg-primary/10 p-3 text-primary-light">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div>
          <p className="text-lg font-semibold">Protect your sender reputation.</p>
          <p className="mt-1 text-text-muted">
            Reduce &ldquo;Mark as Spam&rdquo; rates by up to{" "}
            <span className="font-bold text-primary-light">40%</span>.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
