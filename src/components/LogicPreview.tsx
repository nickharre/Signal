"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogicPreview() {
  const [inSupport, setInSupport] = useState(false);

  const response = inSupport
    ? {
        marketing_eligibility: false,
        reason: "Prioritizing Support Experience",
        support_ticket: { id: "TK-4821", priority: "high", status: "open" },
      }
    : {
        marketing_eligibility: true,
        next_scheduled: "2026-04-01T14:00:00Z",
        channel: "email",
      };

  const json = JSON.stringify(response, null, 2);

  return (
    <section id="logic-preview" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold sm:text-4xl"
        >
          Live Logic Preview
        </motion.h2>
        <p className="mx-auto mt-3 max-w-md text-center text-text-muted">
          Toggle the scenario and watch the API response change in real time.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="text-sm text-text-muted">User is in Support Loop</span>
          <button
            aria-pressed={inSupport}
            onClick={() => setInSupport((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              inSupport ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
                inSupport ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs text-text-muted">
            <span className="font-mono">GET</span>
            <span className="font-mono text-text">/v1/contacts/cid_93f1/eligibility</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={String(inSupport)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="overflow-x-auto p-4"
            >
              <pre className="text-sm leading-relaxed">
                {json.split("\n").map((line, i) => (
                  <span key={i}>
                    {line.includes('"marketing_eligibility"') ? (
                      <>
                        {line.split(/true|false/)[0]}
                        <span className={inSupport ? "text-red-400 font-semibold" : "text-emerald-400 font-semibold"}>
                          {inSupport ? "false" : "true"}
                        </span>
                        {line.endsWith(",") ? "," : ""}
                      </>
                    ) : (
                      line
                    )}
                    {"\n"}
                  </span>
                ))}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>

        {inSupport && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-accent"
          >
            Marketing paused &mdash; support experience takes priority.
          </motion.p>
        )}
      </div>
    </section>
  );
}
