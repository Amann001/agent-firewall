"use client";

import { motion } from "framer-motion";

import {
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Modal from "../Modal";

const metrics = [
  {
    label: "Known attacks",
    value: 5,
    suffix: "/5",
  },
  {
    label: "Reworded attacks",
    value: 3,
    suffix: "/3",
  },
  {
    label: "False positives",
    value: 0,
    suffix: "",
  },
];

export default function ResultsModal({
  open,
  onClose,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow="Validated test corpus"
      title="Security results"
      size="xl"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map(
          (metric, index) => (
            <motion.div
              key={metric.label}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-5"
            >
              <p className="text-xs text-white/45">
                {metric.label}
              </p>

              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
                {metric.value}

                <span className="text-white/30">
                  {metric.suffix}
                </span>
              </p>
            </motion.div>
          )
        )}
      </div>

      <div className="my-8 h-px bg-white/[0.07]" />

      <div className="grid gap-5 md:grid-cols-2">
        <ResultCard
          icon={<ShieldAlert size={20} />}
          title="Without Warden"
          danger
          description="A plausible business message caused the vulnerable agent to make a risky tool call and forward financial data to an unfamiliar external recipient."
        />

        <ResultCard
          icon={<ShieldCheck size={20} />}
          title="With Warden"
          description="The same attack is inspected before execution. Injection attempts are blocked, while high-risk actions are paused for human approval."
        />
      </div>

      <div className="mt-8 rounded-2xl border border-[#e7a83b]/15 bg-[#e7a83b]/[0.035] p-5">
        <p className="warden-kicker">
          What the result proves
        </p>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
          Warden separates deception detection
          from objective action risk. The three
          layers are deliberately non-redundant:
          rules catch known patterns, the LLM judge
          catches disguised intent, and the Manager
          evaluates what the agent is about to do.
        </p>
      </div>
    </Modal>
  );
}

function ResultCard({
  icon,
  title,
  description,
  danger,
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        danger
          ? "border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.035]"
          : "border-[#46d6a0]/20 bg-[#46d6a0]/[0.035]"
      }`}
    >
      <div
        className={
          danger
            ? "text-[#ff6c70]"
            : "text-[#59dca9]"
        }
      >
        {icon}
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/55">
        {description}
      </p>
    </div>
  );
}