"use client";
import { motion } from "framer-motion";
import { MailWarning, MessageSquare, Bell, Frown, Heart } from "lucide-react";

const channels = [
  { icon: MailWarning, label: "Email" },
  { icon: MessageSquare, label: "SMS" },
  { icon: Bell, label: "Push" },
];

function MessageDot({ delay, icon: Icon, label }: { delay: number; icon: React.ElementType; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-text-muted"
    >
      <Icon className="h-4 w-4" /> {label}
    </motion.div>
  );
}

export default function Conflict() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold sm:text-4xl"
        >
          Siloed vs.{" "}
          <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            Orchestrated
          </span>
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Siloed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-red-500/20 bg-surface p-8"
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-400">Siloed Brand</p>
            <p className="mb-6 text-sm text-text-muted">3 tools fire at once</p>
            <div className="flex flex-wrap gap-2">
              {channels.map((c) => (
                <MessageDot key={c.label} delay={0} icon={c.icon} label={c.label} />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-red-400">
              <Frown className="h-5 w-5" /> <span className="text-sm font-medium">Customer Unsubscribes</span>
            </div>
          </motion.div>

          {/* Orchestrated */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-primary/30 bg-surface p-8"
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary-light">Orchestrated with Signal</p>
            <p className="mb-6 text-sm text-text-muted">Messages spaced &amp; sequenced</p>
            <div className="flex flex-wrap gap-2">
              {channels.map((c, i) => (
                <MessageDot key={c.label} delay={i * 0.4} icon={c.icon} label={c.label} />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-primary-light">
              <Heart className="h-5 w-5" /> <span className="text-sm font-medium">Customer Engages</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
