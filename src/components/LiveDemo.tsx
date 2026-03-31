"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Topic = "weekly_digest" | "product_launches" | "special_offers";
type Channel = "email" | "sms";

const TOPICS: { key: Topic; label: string }[] = [
  { key: "weekly_digest", label: "Weekly Digest" },
  { key: "product_launches", label: "Product Launches" },
  { key: "special_offers", label: "Special Offers" },
];
const CHANNELS: Channel[] = ["email", "sms"];

const IMPACT: Record<string, string> = {
  weekly_digest_email: "Email digest queue updated.",
  weekly_digest_sms: "SMS digest cadence adjusted.",
  product_launches_email: "Launch announcement list updated.",
  product_launches_sms: "SMS launch alerts reconfigured.",
  special_offers_email: "Promotional email pool resized.",
  special_offers_sms: "SMS offer pipeline updated.",
};

type Prefs = Record<`${Topic}_${Channel}`, boolean>;

const initPrefs = (): Prefs =>
  Object.fromEntries(
    TOPICS.flatMap((t) => CHANNELS.map((c) => [`${t.key}_${c}`, true]))
  ) as Prefs;

function Toggle({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 1.12 }}
      aria-pressed={on}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
        on ? "bg-primary" : "bg-border"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm ${
          on ? "translate-x-4" : ""
        }`}
      />
    </motion.button>
  );
}

export default function LiveDemo() {
  const [snoozed, setSnoozed] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(initPrefs);
  const [toast, setToast] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [lastChange, setLastChange] = useState<{
    topic: Topic;
    channel: Channel;
    status: boolean;
  } | null>(null);

  const showToast = useCallback(() => {
    setToast(true);
    const id = setTimeout(() => setToast(false), 1800);
    return () => clearTimeout(id);
  }, []);

  const togglePref = (topic: Topic, channel: Channel) => {
    const key = `${topic}_${channel}` as keyof Prefs;
    const next = !prefs[key];
    setPrefs((p) => ({ ...p, [key]: next }));
    setLastChange({ topic, channel, status: next });
    if (channel === "email" && !next) setFeedback(null);
    else setFeedback(null);
    showToast();
  };

  const toggleSnooze = () => {
    setSnoozed((v) => !v);
    setLastChange(null);
    showToast();
  };

  // Which email toggles were just turned off (show micro-survey)
  const emailOffTopics = TOPICS.filter((t) => !prefs[`${t.key}_email`]);

  const payload = snoozed
    ? {
        customer_id: "usr_123",
        update: { global_snooze: true, duration_days: 30 },
        orchestration_impact:
          "All non-essential sends paused for 30 days.",
      }
    : lastChange
    ? {
        customer_id: "usr_123",
        update: {
          topic: lastChange.topic,
          channel: lastChange.channel,
          status: lastChange.status ? "opt_in" : "opt_out",
        },
        orchestration_impact: `${
          IMPACT[`${lastChange.topic}_${lastChange.channel}`]
        } Sending ${lastChange.status ? "resumed" : "paused"}.`,
      }
    : {
        customer_id: "usr_123",
        update: null,
        orchestration_impact: "Awaiting preference change…",
      };

  const json = JSON.stringify(payload, null, 2);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold sm:text-4xl"
        >
          The End of the All-or-Nothing Unsubscribe.
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-text-muted">
          Give your customers the controls they actually want. Turn breakups
          into pauses and keep your audience engaged on their own terms.
        </p>

        <div className="mt-14 flex flex-col items-start gap-8 lg:flex-row">
          {/* ── Preference Card ── */}
          <div className="relative w-full lg:w-1/2">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg">
              {/* Header bar */}
              <div className="mb-5 flex items-center gap-2 text-xs text-text-muted">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono">Preference Center</span>
              </div>

              {/* Global Snooze */}
              <div className="flex items-center justify-between rounded-xl bg-surface-2 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Global Snooze</p>
                  <p className="text-xs text-text-muted">
                    Taking a break? Mute all non-essential pings for 30 days.
                  </p>
                </div>
                <Toggle
                  on={snoozed}
                  onToggle={toggleSnooze}
                  label="Global snooze toggle"
                />
              </div>

              {/* Matrix */}
              <div className="mt-5">
                {/* Column headers */}
                <div className="mb-2 grid grid-cols-[1fr_60px_60px] items-center gap-2 px-1 text-xs font-medium uppercase tracking-wider text-text-muted">
                  <span />
                  <span className="text-center">Email</span>
                  <span className="text-center">SMS</span>
                </div>

                {TOPICS.map((t) => (
                  <div
                    key={t.key}
                    className="grid grid-cols-[1fr_60px_60px] items-center gap-2 rounded-lg px-1 py-2.5 odd:bg-surface-2/50"
                  >
                    <span className="text-sm">{t.label}</span>
                    {CHANNELS.map((c) => (
                      <div key={c} className="flex justify-center">
                        <Toggle
                          on={!snoozed && prefs[`${t.key}_${c}`]}
                          onToggle={() => togglePref(t.key, c)}
                          label={`${t.label} ${c}`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Micro-survey */}
              <AnimatePresence>
                {emailOffTopics.length > 0 && !snoozed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-xl border border-border/60 bg-surface-2/60 px-4 py-3">
                      <p className="mb-2 text-xs text-text-muted">
                        Mind telling us why?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["Frequency", "Relevance", "Other"].map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              setFeedback(r);
                              showToast();
                            }}
                            className={`rounded-full border px-3 py-1 text-xs transition ${
                              feedback === r
                                ? "border-primary bg-primary/20 text-primary-light"
                                : "border-border text-text-muted hover:border-primary/40"
                            }`}
                          >
                            {r === "Frequency"
                              ? "Just too many"
                              : r === "Relevance"
                              ? "Not for me"
                              : "Other"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-medium text-white shadow-lg"
                >
                  ✓ Preferences saved in 12ms.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Developer Console Sidecar ── */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs text-text-muted">
                <span className="font-mono text-primary-light">›_</span>
                <span className="font-mono">Gatekeeper &mdash; Event Stream</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={json}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-x-auto p-4"
                >
                  <pre className="text-sm leading-relaxed">
                    {json.split("\n").map((line, i) => {
                      if (line.includes('"opt_out"'))
                        return (
                          <span key={i}>
                            {line.replace(
                              '"opt_out"',
                              ""
                            )}
                            <span className="text-red-400 font-semibold">
                              &quot;opt_out&quot;
                            </span>
                            {"\n"}
                          </span>
                        );
                      if (line.includes('"opt_in"'))
                        return (
                          <span key={i}>
                            {line.replace(
                              '"opt_in"',
                              ""
                            )}
                            <span className="text-emerald-400 font-semibold">
                              &quot;opt_in&quot;
                            </span>
                            {"\n"}
                          </span>
                        );
                      if (line.includes("paused"))
                        return (
                          <span key={i} className="text-yellow-300/80">
                            {line}
                            {"\n"}
                          </span>
                        );
                      return (
                        <span key={i}>
                          {line}
                          {"\n"}
                        </span>
                      );
                    })}
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
