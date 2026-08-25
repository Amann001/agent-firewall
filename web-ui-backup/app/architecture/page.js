"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Fingerprint,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "../components/PageHeader";

const layers = [
  {
    number: "01",
    title: "Rule Filter",
    subtitle: "Fast pattern detection",
    icon: Fingerprint,
    description:
      "The first layer checks incoming messages against known prompt-injection patterns. It is deterministic, inexpensive, and extremely fast.",
    detects: [
      "Known injection phrases",
      "Instruction overrides",
      "Suspicious patterns",
    ],
  },
  {
    number: "02",
    title: "LLM Intent Judge",
    subtitle: "Semantic manipulation detection",
    icon: BrainCircuit,
    description:
      "Messages that survive Layer 1 are evaluated for disguised manipulation. Instead of looking for exact words, this layer reasons about intent.",
    detects: [
      "Reworded attacks",
      "Disguised manipulation",
      "Suspicious intent",
    ],
  },
  {
    number: "03",
    title: "Risk Manager",
    subtitle: "Action risk + human approval",
    icon: UserRoundCheck,
    description:
      "Even a legitimate message can produce a dangerous action. The Manager evaluates the resulting tool call independently of the message's intent.",
    detects: [
      "High-risk actions",
      "Unknown recipients",
      "Sensitive tool calls",
    ],
  },
];

export default function ArchitecturePage() {
  return (
    <main>
      <div className="warden-grid" />
      <div className="warden-noise" />

      <section className="warden-section pt-36 sm:pt-44">
        <div className="warden-shell">

          <PageHeader
            eyebrow="WARDEN / ARCHITECTURE"
            title={
              <>
                Three layers.
                <br />
                Three different jobs.
              </>
            }
            description="Warden does not rely on one detector. Each layer addresses a different failure mode so that a message can be safe in one dimension and still be stopped in another."
          />

          {/* Pipeline */}
          <div className="relative mt-20">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#e7a83b]/50 via-white/10 to-transparent md:block" />

            <div className="space-y-6">
              {layers.map((layer, index) => {
                const Icon = layer.icon;

                return (
                  <motion.div
                    key={layer.number}
                    initial={{
                      opacity: 0,
                      x: -25,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.1,
                    }}
                    className="relative md:pl-16"
                  >
                    <div className="absolute left-0 top-6 hidden h-10 w-10 items-center justify-center rounded-full border border-[#e7a83b]/30 bg-[#0a0b0a] md:flex">
                      <span className="font-mono text-[9px] text-[#e7a83b]">
                        {layer.number}
                      </span>
                    </div>

                    <div className="warden-card group relative overflow-hidden rounded-2xl p-7 sm:p-9">
                      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#e7a83b]/[0.035] blur-3xl transition duration-700 group-hover:bg-[#e7a83b]/[0.08]" />

                      <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-start">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025]">
                          <Icon
                            size={21}
                            className="text-[#e7a83b]"
                          />
                        </div>

                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#e7a83b]">
                            Layer {layer.number}
                          </p>

                          <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">
                            {layer.title}
                          </h2>

                          <p className="mt-2 text-sm font-medium text-white/50">
                            {layer.subtitle}
                          </p>

                          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
                            {layer.description}
                          </p>
                        </div>

                        <div className="lg:min-w-[190px]">
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
                            Detects
                          </p>

                          <div className="mt-3 space-y-2">
                            {layer.detects.map(
                              (item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-xs text-white/45"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#46d6a0]" />
                                  {item}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {index < layers.length - 1 && (
                      <motion.div
                        initial={{
                          height: 0,
                        }}
                        whileInView={{
                          height: 24,
                        }}
                        viewport={{
                          once: true,
                        }}
                        className="ml-5 w-px bg-[#e7a83b]/30 md:hidden"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Decision principle */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mt-20 rounded-3xl border border-[#e7a83b]/15 bg-[#e7a83b]/[0.025] p-7 sm:p-10"
          >
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="warden-kicker">
                  Design principle
                </p>

                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                  Fail-safe by design.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
                  If a security check fails, Warden
                  defaults to blocking or flagging
                  the action rather than silently
                  allowing it.
                </p>
              </div>

              <ShieldCheck
                size={46}
                strokeWidth={1.2}
                className="text-[#e7a83b]"
              />
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/live-demo"
              className="warden-btn warden-btn-primary"
            >
              Test the pipeline
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/results"
              className="warden-btn warden-btn-secondary"
            >
              See results
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}