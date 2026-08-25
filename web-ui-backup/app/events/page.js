"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "../components/PageHeader";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  async function loadEvents() {
    try {
      setError(null);

      const response = await fetch(
        "http://127.0.0.1:8000/events",
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}`
        );
      }

      const data = await response.json();

      setEvents(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      setError(
        "Unable to connect to the Warden API."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();

    const interval = setInterval(
      loadEvents,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  const blocked = events.filter((event) =>
    String(event.outcome)
      .toLowerCase()
      .includes("block")
  ).length;

  const paused = events.filter((event) =>
    String(event.outcome)
      .toLowerCase()
      .includes("pause")
  ).length;

  const executed = events.filter(
    (event) =>
      String(event.outcome)
        .toLowerCase()
        .includes("execut")
  ).length;

  return (
    <main>
      <div className="warden-grid" />
      <div className="warden-noise" />

      <section className="warden-section pt-36 sm:pt-44">
        <div className="warden-shell">

          <PageHeader
            eyebrow="WARDEN / EVENTS"
            title={
              <>
                Every decision.
                <br />
                Accounted for.
              </>
            }
            description="A live audit trail of messages processed by Warden. Events are pulled directly from your existing FastAPI and Supabase pipeline."
          />

          {/* System banner */}
          <div className="mt-14 flex items-center gap-3 rounded-xl border border-[#46d6a0]/15 bg-[#46d6a0]/[0.025] px-5 py-4">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#46d6a0]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#59dca9]">
              Live event stream
            </span>

            <span className="ml-auto font-mono text-[9px] text-white/25">
              refresh: 10s
            </span>
          </div>

          {/* Stats */}
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <Metric
              icon={<Activity size={17} />}
              value={events.length}
              label="Total events"
            />

            <Metric
              icon={<ShieldAlert size={17} />}
              value={blocked}
              label="Blocked"
              danger
            />

            <Metric
              icon={<UserCheck size={17} />}
              value={paused}
              label="Awaiting approval"
            />

            <Metric
              icon={<ShieldCheck size={17} />}
              value={executed}
              label="Executed"
              safe
            />
          </div>

          {/* Event list */}
          <div className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="warden-kicker">
                  Recent activity
                </p>

                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  Security events
                </h2>
              </div>

              <button
                onClick={loadEvents}
                className="warden-btn warden-btn-secondary h-9 min-h-9 text-xs"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState message={error} />
            ) : events.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {events.map(
                  (event, index) => (
                    <EventCard
                      key={
                        event.id ||
                        index
                      }
                      event={event}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({
  icon,
  value,
  label,
  danger,
  safe,
}) {
  return (
    <div className="warden-card rounded-xl p-5">
      <div
        className={
          danger
            ? "text-[#ff6c70]"
            : safe
              ? "text-[#59dca9]"
              : "text-[#e7a83b]"
        }
      >
        {icon}
      </div>

      <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
        {value}
      </p>

      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/25">
        {label}
      </p>
    </div>
  );
}

function EventCard({ event, index }) {
  const outcome = String(
    event.outcome || "unknown"
  ).toLowerCase();

  const isBlocked =
    outcome.includes("block");

  const isPaused =
    outcome.includes("pause");

  const isExecuted =
    outcome.includes("execut");

  const icon = isBlocked ? (
    <XCircle size={19} />
  ) : isPaused ? (
    <AlertTriangle size={19} />
  ) : isExecuted ? (
    <CheckCircle2 size={19} />
  ) : (
    <Clock3 size={19} />
  );

  const stateClass = isBlocked
    ? "text-[#ff6c70] border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.05]"
    : isPaused
      ? "text-[#e7a83b] border-[#e7a83b]/20 bg-[#e7a83b]/[0.05]"
      : "text-[#59dca9] border-[#46d6a0]/20 bg-[#46d6a0]/[0.05]";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className="warden-card rounded-xl p-5 transition hover:border-white/[0.15]"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${stateClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${stateClass}`}
            >
              {event.outcome ||
                "unknown"}
            </span>

            {event.risk_level && (
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/25">
                risk:{" "}
                {event.risk_level}
              </span>
            )}
          </div>

          <p className="mt-3 truncate text-sm text-white/65">
            {event.input_text ||
              "No input recorded."}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/25">
            {event.caught_by && (
              <span>
                caught:{" "}
                {event.caught_by}
              </span>
            )}

            {event.tool_name && (
              <span>
                tool:{" "}
                {event.tool_name}
              </span>
            )}

            {event.approval_status && (
              <span>
                approval:{" "}
                {event.approval_status}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 font-mono text-[9px] text-white/20">
          {event.created_at
            ? new Date(
                event.created_at
              ).toLocaleString()
            : "—"}
        </div>
      </div>
    </motion.div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-28 animate-pulse rounded-xl border border-white/[0.06] bg-white/[0.02]"
        />
      ))}
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="rounded-xl border border-[#ff5a5f]/20 bg-[#ff5a5f]/[0.04] p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#ff777b]">
        API connection error
      </p>

      <p className="mt-3 text-sm text-white/50">
        {message}
      </p>

      <p className="mt-4 font-mono text-[9px] text-white/25">
        Make sure FastAPI is running on
        port 8000.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
        No events yet
      </p>

      <p className="mt-3 text-sm text-white/40">
        Run a test from the Live Demo
        to create your first security
        event.
      </p>
    </div>
  );
}