"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "../components/PageHeader";

const stats = [
  {
    value: "5/5",
    label: "Known attacks caught",
  },
  {
    value: "3/3",
    label: "Reworded attacks caught",
  },
  {
    value: "0",
    label: "False positives",
  },
];

const tests = [
  {
    name: "Known attack",
    layer1: "BLOCKED",
    layer2: "—",
    manager: "—",
    status: "blocked",
  },
  {
    name: "Reworded attack",
    layer1: "PASSED",
    layer2: "BLOCKED",
    manager: "—",
    status: "blocked",
  },
  {
    name: "Legitimate message",
    layer1: "PASSED",
    layer2: "PASSED",
    manager: "EXECUTED",
    status: "safe",
  },
  {
    name: "Risky legitimate action",
    layer1: "PASSED",
    layer2: "PASSED",
    manager: "PAUSED",
    status: "paused",
  },
];

export default function ResultsPage() {
  return (
    <main>
      <div className="warden-grid" />
      <div className="warden-noise" />

      <section className="warden-section pt-36 sm:pt-44">
        <div className="warden-shell">

          <PageHeader
            eyebrow="WARDEN / RESULTS"
            title={
              <>
                Proof,
                <br />
                not promises.
              </>
            }
            description="Warden was tested against known prompt-injection techniques, reworded variants, legitimate messages, and an independent high-risk action scenario."
          />

          {/* Stats */}
          <div className="mt-16 grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="warden-card rounded-2xl p-6 sm:p-8"
              >
                <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  {stat.value}
                </p>

                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Before / after */}
          <div className="mt-20 grid gap-4 lg:grid-cols-2">

            <ResultPanel
              type="danger"
              title="Without Warden"
              icon={<ShieldAlert size={21} />}
            >
              <FlowItem
                label="Incoming message"
                text="Disguised compliance request"
              />

              <FlowArrow />

              <FlowItem
                label="AI Agent"
                text="Accepts the instruction"
              />

              <FlowArrow />

              <FlowItem
                label="Tool call"
                text="forward_data"
              />

              <FlowArrow />

              <FlowItem
                label="Result"
                text="Financial data sent externally"
                danger
              />
            </ResultPanel>

            <ResultPanel
              type="safe"
              title="With Warden"
              icon={<ShieldCheck size={21} />}
            >
              <FlowItem
                label="Incoming message"
                text="Same attack"
              />

              <FlowArrow />

              <FlowItem
                label="Layer 1 + Layer 2"
                text="Manipulation detected"
              />

              <FlowArrow />

              <FlowItem
                label="Firewall decision"
                text="Execution prevented"
              />

              <FlowArrow />

              <FlowItem
                label="Result"
                text="Action blocked safely"
                safe
              />
            </ResultPanel>

          </div>

          {/* Table */}
          <div className="mt-20">
            <p className="warden-kicker">
              Test matrix
            </p>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              How each layer responded.
            </h2>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/[0.08]">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.025]">
                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Test
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Layer 1
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Layer 2
                    </th>

                    <th className="px-5 py-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Manager
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tests.map((test) => (
                    <tr
                      key={test.name}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="px-5 py-5 text-sm font-medium text-white/75">
                        {test.name}
                      </td>

                      <StatusCell value={test.layer1} />

                      <StatusCell value={test.layer2} />

                      <StatusCell value={test.manager} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/live-demo"
              className="warden-btn warden-btn-primary"
            >
              Reproduce the test
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/architecture"
              className="warden-btn warden-btn-secondary"
            >
              Explore architecture
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ResultPanel({
  type,
  title,
  icon,
  children,
}) {
  const danger = type === "danger";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className={`rounded-2xl border p-6 sm:p-8 ${
        danger
          ? "border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.025]"
          : "border-[#46d6a0]/20 bg-[#46d6a0]/[0.025]"
      }`}
    >
      <div
        className={`flex items-center gap-3 ${
          danger
            ? "text-[#ff6c70]"
            : "text-[#59dca9]"
        }`}
      >
        {icon}

        <h3 className="font-display text-xl font-semibold text-white">
          {title}
        </h3>
      </div>

      <div className="mt-7 space-y-3">
        {children}
      </div>
    </motion.div>
  );
}

function FlowItem({
  label,
  text,
  danger,
  safe,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        danger
          ? "border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.05]"
          : safe
            ? "border-[#46d6a0]/20 bg-[#46d6a0]/[0.05]"
            : "border-white/[0.07] bg-white/[0.02]"
      }`}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
        {label}
      </p>

      <p className="mt-2 text-sm text-white/70">
        {text}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center text-white/20">
      ↓
    </div>
  );
}

function StatusCell({ value }) {
  if (value === "—") {
    return (
      <td className="px-5 py-5 font-mono text-[10px] text-white/20">
        —
      </td>
    );
  }

  const positive =
    value === "PASSED" ||
    value === "EXECUTED";

  const negative =
    value === "BLOCKED";

  return (
    <td className="px-5 py-5">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] ${
          positive
            ? "border-[#46d6a0]/20 bg-[#46d6a0]/[0.05] text-[#59dca9]"
            : negative
              ? "border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.05] text-[#ff777b]"
              : "border-[#e7a83b]/20 bg-[#e7a83b]/[0.05] text-[#e7a83b]"
        }`}
      >
        {positive ? (
          <Check size={10} />
        ) : negative ? (
          <X size={10} />
        ) : null}

        {value}
      </span>
    </td>
  );
}