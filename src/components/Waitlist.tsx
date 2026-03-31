"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [position, setPosition] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPosition(data.position);
      setState("success");
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  return (
    <section id="waitlist" className="px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold sm:text-4xl"
        >
          Get Early Access
        </motion.h2>
        <p className="mt-3 text-text-muted">
          Join the waitlist and be the first to orchestrate.
        </p>

        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10"
            >
              <Confetti />
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-primary-light">
                <Check className="h-5 w-5" />
                <span className="font-medium">
                  You&rsquo;re #{position} on the list
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-10 flex gap-2"
            >
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light disabled:opacity-60"
              >
                {state === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Join <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {state === "error" && (
          <p className="mt-3 text-sm text-red-400">Something went wrong. Try again.</p>
        )}
      </div>
    </section>
  );
}

/* Lightweight confetti burst */
function Confetti() {
  const colors = ["#6366f1", "#818cf8", "#a78bfa", "#f472b6", "#34d399"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            x: "50vw",
            y: "50vh",
            scale: 0,
          }}
          animate={{
            opacity: 0,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: Math.random() * 1.5 + 0.5,
            rotate: Math.random() * 720,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.8, ease: "easeOut" }}
          className="absolute h-2 w-2 rounded-sm"
          style={{ background: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}
