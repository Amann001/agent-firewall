"use client";

import { motion } from "framer-motion";

import {
  ArrowDown,
  BrainCircuit,
  Fingerprint,
  UserRoundCheck,
} from "lucide-react";

const layers = [
  {
    number: "01",
    title: "Rule filter",
    subtitle: "Fast pattern detection",
    text: "Known prompt-injection patterns are checked first. It is cheap, deterministic, and fast.",
    icon: Fingerprint,
  },
  {
    number: "02",
    title: "Intent judge",
    subtitle: "Semantic manipulation detection",
    text: "Messages that survive the first layer are evaluated for disguised manipulation and suspicious intent.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Manager",
    subtitle: "Action risk + human approval",
    text: "Even a legitimate message can create a risky action. High-risk tool calls pause for explicit human approval.",
    icon: UserRoundCheck,
  },
];

export default function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="warden-section"
    >
      <div className="warden-shell">
        <div className="max-w-2xl">
          <p className="warden-kicker">
            How Warden thinks
          </p>

          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">
            Three layers.
            <br />
            Three different jobs.
          </h2>

          <p className="mt-6 text-base leading-7 text-white/50 sm:text-lg">
            Warden is not three copies of the
            same check. Each layer catches a
            different failure mode before an
            autonomous action can escape.
          </p>
        </div>

        <div className="mt-14 grid gap-3 lg:grid-cols-3">
          {layers.map(
            (layer, index) => {
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.number}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="warden-card group relative overflow-hidden rounded-2xl p-6 sm:p-7"
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#e7a83b]/[0.04] blur-3xl transition duration-500 group-hover:bg-[#e7a83b]/[0.09]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#e7a83b]">
                        LAYER {layer.number}
                      </span>

                      <Icon
                        size={19}
                        className="text-white/35"
                      />
                    </div>

                    <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                      {layer.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-white/55">
                      {layer.subtitle}
                    </p>

                    <p className="mt-5 text-sm leading-7 text-white/45">
                      {layer.text}
                    </p>

                    <div className="mt-8 h-px bg-white/[0.07]" />

                    <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e7a83b]" />

                      Fail-safe by design
                    </div>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 hidden items-center justify-center gap-2 text-white/25 md:flex"
        >
          <span className="font-mono text-[10px] tracking-[0.18em]">
            MESSAGE
          </span>

          <ArrowDown size={14} />

          <span className="font-mono text-[10px] tracking-[0.18em]">
            DECISION
          </span>

          <ArrowDown size={14} />

          <span className="font-mono text-[10px] tracking-[0.18em]">
            ACTION
          </span>
        </motion.div>
      </div>
    </section>
  );
}