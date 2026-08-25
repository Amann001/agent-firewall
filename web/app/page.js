"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";
import LiveFirewall from "./components/LiveFirewall";

const FirewallScene = dynamic(
  () => import("./components/FirewallScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-2 w-2 animate-pulse rounded-full bg-[#e7a83b]" />
      </div>
    ),
  }
);

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Home() {
  return (
    <main
      id="hero"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#080909]
        text-white
      "
    >

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10">

        {/* Main warm glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 55% 70% at 68% 45%,
                rgba(231,168,59,0.075),
                transparent 65%
              )
            `,
          }}
        />

        {/* Secondary glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 35% 45% at 15% 45%,
                rgba(231,168,59,0.035),
                transparent 70%
              )
            `,
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.45) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.45) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.35) 100%)",
          }}
        />

      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        className="
          relative
          min-h-screen
          w-full
        "
      >

        <div
          className="
            flex
            min-h-screen
            w-full
            items-center
            px-6
            pb-16
            pt-28
            sm:px-10
            lg:px-14
            xl:px-[5vw]
            2xl:px-[7vw]
          "
        >

          <div
            className="
              grid
              w-full
              grid-cols-1
              items-center
              gap-8
              lg:grid-cols-[0.95fr_1.05fr]
              xl:grid-cols-[0.9fr_1.1fr]
              2xl:grid-cols-[0.85fr_1.15fr]
            "
          >

            {/* LEFT CONTENT */}

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="
                relative
                z-10
                max-w-[760px]
              "
            >

              <motion.div
                variants={fadeUp}
                className="
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.11]
                  bg-white/[0.025]
                  px-4
                  py-2
                  backdrop-blur-md
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-emerald-400
                      opacity-50
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_10px_rgba(52,211,153,0.6)]
                    "
                  />
                </span>

                <span
                  className="
                    font-mono
                    text-[9px]
                    font-medium
                    tracking-[0.2em]
                    text-white/45
                  "
                >
                  AI AGENT FIREWALL / ACTIVE
                </span>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="
                  mb-5
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#e7a83b]
                "
              >
                Security layer for autonomous agents
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="
                  font-display
                  text-[clamp(4rem,7.2vw,8rem)]
                  font-bold
                  leading-[0.82]
                  tracking-[-0.065em]
                "
              >
                <span className="block text-white">
                  Agents can
                </span>

                <span className="block text-white/75">
                  act.
                </span>

                <span className="block text-white/[0.34]">
                  Warden
                </span>

                <span className="block text-white/[0.34]">
                  decides.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="
                  mt-9
                  max-w-[620px]
                  text-[15px]
                  leading-7
                  text-white/[0.48]
                  sm:text-[16px]
                "
              >
                A three-layer defense system that catches prompt injection,
                evaluates intent, and stops risky autonomous actions before
                they execute.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="
                  mt-9
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                <motion.a
                  href="#demo"
                  whileHover={{
                    y: -4,
                    scale: 1.035,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    group
                    relative
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-lg
                    border
                    border-[#f1b84b]
                    bg-[#e7a83b]
                    px-6
                    text-[13px]
                    font-semibold
                    text-[#080909]
                    shadow-[0_10px_30px_rgba(231,168,59,0.12)]
                    transition-all
                    duration-300
                    hover:border-[#f6c86e]
                    hover:bg-[#f3bd58]
                    hover:shadow-[0_18px_45px_rgba(231,168,59,0.25)]
                  "
                >

                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-[70%]
                      w-[45%]
                      skew-x-[-20deg]
                      bg-white/25
                      transition-all
                      duration-700
                      group-hover:left-[120%]
                    "
                  />

                  <span className="relative z-10">
                    Run an attack
                  </span>

                  <ArrowRight
                    size={16}
                    className="
                      relative
                      z-10
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </motion.a>

                <motion.a
                  href="#architecture"
                  whileHover={{
                    y: -4,
                    scale: 1.025,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    group
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    border
                    border-white/[0.14]
                    bg-[#111311]
                    px-6
                    text-[13px]
                    font-semibold
                    text-white/[0.88]
                    shadow-[0_8px_24px_rgba(0,0,0,0.2)]
                    transition-all
                    duration-300
                    hover:border-[#e7a83b]/45
                    hover:bg-[#171713]
                    hover:text-white
                    hover:shadow-[0_14px_35px_rgba(0,0,0,0.4)]
                  "
                >

                  <span>
                    Explore architecture
                  </span>

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </motion.a>

              </motion.div>

              <motion.div
                variants={fadeUp}
                className="
                  mt-9
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-3
                "
              >

                <TrustPoint text="3-layer defense" />

                <div className="hidden h-3 w-px bg-white/10 sm:block" />

                <TrustPoint text="Human approval" />

                <div className="hidden h-3 w-px bg-white/10 sm:block" />

                <TrustPoint text="Full audit trail" />

              </motion.div>

            </motion.div>

            {/* RIGHT SIDE / 3D */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                x: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1.15,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                h-[500px]
                w-full
                lg:h-[650px]
                xl:h-[720px]
                2xl:h-[760px]
              "
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[400px]
                  w-[400px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  blur-[120px]
                "
                style={{
                  background:
                    "rgba(231,168,59,0.06)",
                }}
              />

              <div className="absolute inset-0">
                <FirewallScene />
              </div>

              <motion.div
                animate={{
                  opacity: [0.25, 0.65, 0.25],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  left-[4%]
                  top-[40%]
                  hidden
                  items-center
                  gap-3
                  lg:flex
                "
              >
                <span className="h-px w-12 bg-[#e7a83b]/40" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  INPUT
                </span>
              </motion.div>

              <motion.div
                animate={{
                  opacity: [0.25, 0.65, 0.25],
                }}
                transition={{
                  duration: 3,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  right-[1%]
                  top-[53%]
                  hidden
                  items-center
                  gap-3
                  lg:flex
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  DECISION
                </span>

                <span className="h-px w-12 bg-[#e7a83b]/40" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-[5%]
                  right-[4%]
                  w-[195px]
                  rounded-xl
                  border
                  border-white/[0.1]
                  bg-[#0d0f0e]/90
                  p-4
                  shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                  backdrop-blur-xl
                  sm:w-[205px]
                  xl:right-[7%]
                "
              >

                <div className="flex items-center justify-between">

                  <span
                    className="
                      font-mono
                      text-[8px]
                      tracking-[0.15em]
                      text-white/30
                    "
                  >
                    FIREWALL STATE
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      font-mono
                      text-[8px]
                      font-semibold
                      tracking-[0.1em]
                      text-emerald-400
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_8px_rgba(52,211,153,0.7)]
                      "
                    />

                    PROTECTED
                  </span>

                </div>

                <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.06]">

                  <motion.div
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "72%",
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 0.9,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-[#e7a83b]"
                  />

                </div>

              </motion.div>

            </motion.div>

          </div>
        </div>

        <motion.a
          href="#architecture"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            bottom-7
            left-1/2
            hidden
            -translate-x-1/2
            flex-col
            items-center
            gap-2
            lg:flex
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.22em]
              text-white/30
            "
          >
            EXPLORE
          </span>

          <ArrowDown
            size={14}
            className="text-white/40"
          />
        </motion.a>

      </section>

      {/* =========================================================
          ARCHITECTURE
      ========================================================= */}

      <section
        id="architecture"
        className="
          relative
          w-full
          border-t
          border-white/[0.06]
          px-6
          py-28
          sm:px-10
          lg:px-14
          xl:px-[5vw]
          2xl:px-[7vw]
        "
      >

        <div className="w-full">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              variants={fadeUp}
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-[#e7a83b]
              "
            >
              Architecture
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="
                mt-4
                max-w-[800px]
                font-display
                text-4xl
                font-semibold
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Three layers.
              <br />

              <span className="text-white/35">
                One decision boundary.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="
                mt-6
                max-w-[700px]
                text-[15px]
                leading-7
                text-white/45
              "
            >
              Warden does not rely on a single detector. Each layer has a
              different responsibility — from fast pattern matching to
              intent analysis and finally action-level risk assessment.
            </motion.p>

            <div className="mt-14 grid gap-4 md:grid-cols-3">

              <ArchitectureCard
                number="01"
                title="Rule-based filter"
                description="Fast pattern matching catches known prompt injection techniques before they reach the AI agent."
              />

              <ArchitectureCard
                number="02"
                title="Intent judge"
                description="An LLM evaluates messages that bypass the first layer, looking for disguised manipulation."
              />

              <ArchitectureCard
                number="03"
                title="Risk manager"
                description="Potentially dangerous autonomous actions are risk-scored and paused for human approval."
              />

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================================
          RESULTS
      ========================================================= */}

      <section
        id="results"
        className="
          relative
          w-full
          border-t
          border-white/[0.06]
          px-6
          py-28
          sm:px-10
          lg:px-14
          xl:px-[5vw]
          2xl:px-[7vw]
        "
      >

        <div className="w-full">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#e7a83b]
                "
              >
                Results
              </div>

              <h2
                className="
                  mt-4
                  font-display
                  text-4xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-5xl
                "
              >
                Built around
                <br />

                <span className="text-white/35">
                  real attacks.
                </span>
              </h2>

            </div>

            <p
              className="
                max-w-[700px]
                text-[15px]
                leading-7
                text-white/45
                lg:ml-auto
              "
            >
              The firewall was tested against known attacks, reworded
              attacks, and legitimate messages to verify that the system
              detects manipulation without simply blocking everything.
            </p>

          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">

            <ResultCard
              value="8/8"
              label="Attacks caught"
              description="Known + reworded attack variants"
            />

            <ResultCard
              value="0"
              label="False positives"
              description="Across the legitimate test set"
            />

            <ResultCard
              value="3"
              label="Defense layers"
              description="Rules, intent & action risk"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          DEMO
      ========================================================= */}

      <section
        id="demo"
        className="
          relative
          w-full
          border-t
          border-white/[0.06]
          px-6
          py-28
          sm:px-10
          lg:px-14
          xl:px-[5vw]
          2xl:px-[7vw]
        "
      >

        <div
          className="
            w-full
            rounded-2xl
            border
            border-white/[0.08]
            bg-white/[0.018]
            p-8
            shadow-[0_30px_100px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
            sm:p-12
            lg:p-16
          "
        >

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <div
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#e7a83b]
                "
              >
                Live demo
              </div>

              <h2
                className="
                  mt-4
                  max-w-[800px]
                  font-display
                  text-4xl
                  font-semibold
                  tracking-[-0.04em]
                  sm:text-5xl
                "
              >
                See the firewall
                <br />

                <span className="text-white/35">
                  make the decision.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-[650px]
                  text-[15px]
                  leading-7
                  text-white/45
                "
              >
                Send a message through the pipeline and watch Warden
                determine whether it should be blocked, executed, or
                paused for human approval.
              </p>

            </div>

          </div>

          <div className="mt-12">
            <LiveFirewall />
          </div>

        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer
        className="
          border-t
          border-white/[0.06]
          px-6
          py-10
          sm:px-10
          lg:px-14
          xl:px-[5vw]
          2xl:px-[7vw]
        "
      >

        <div
          className="
            flex
            w-full
            flex-col
            justify-between
            gap-5
            sm:flex-row
            sm:items-center
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[#e7a83b]/30
                bg-[#e7a83b]/[0.06]
              "
            >
              <ShieldCheck
                size={16}
                className="text-[#e7a83b]"
              />
            </div>

            <span
              className="
                font-display
                text-sm
                font-bold
                tracking-[-0.02em]
              "
            >
              WARDEN
            </span>

          </div>

          <p
            className="
              font-mono
              text-[9px]
              tracking-[0.15em]
              text-white/25
            "
          >
            AI AGENT FIREWALL / PROMPT INJECTION DEFENSE
          </p>

        </div>
      </footer>

    </main>
  );
}

/* ===============================================================
   TRUST POINT
================================================================ */

function TrustPoint({ text }) {
  return (
    <div className="flex items-center gap-2">

      <Check
        size={11}
        strokeWidth={2.5}
        className="text-emerald-400"
      />

      <span
        className="
          font-mono
          text-[8px]
          uppercase
          tracking-[0.16em]
          text-white/30
        "
      >
        {text}
      </span>

    </div>
  );
}

/* ===============================================================
   ARCHITECTURE CARD
================================================================ */

function ArchitectureCard({
  number,
  title,
  description,
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -7,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.018]
        p-6
        transition-all
        duration-300
        hover:border-[#e7a83b]/25
        hover:bg-white/[0.03]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
    >

      <div className="flex items-center justify-between">

        <span
          className="
            font-mono
            text-[10px]
            tracking-[0.18em]
            text-[#e7a83b]
          "
        >
          LAYER {number}
        </span>

        <ArrowRight
          size={15}
          className="
            text-white/20
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-[#e7a83b]
          "
        />

      </div>

      <h3
        className="
          mt-10
          font-display
          text-xl
          font-semibold
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-4
          text-sm
          leading-6
          text-white/40
        "
      >
        {description}
      </p>

    </motion.div>
  );
}

/* ===============================================================
   RESULT CARD
================================================================ */

function ResultCard({
  value,
  label,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -7,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-xl
        border
        border-white/[0.08]
        bg-white/[0.018]
        p-7
        transition-all
        duration-300
        hover:border-[#e7a83b]/20
        hover:bg-white/[0.028]
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      "
    >

      <div
        className="
          font-display
          text-5xl
          font-semibold
          tracking-[-0.05em]
          text-white
        "
      >
        {value}
      </div>

      <div className="mt-5 text-sm font-semibold text-white/75">
        {label}
      </div>

      <div className="mt-2 text-xs leading-5 text-white/30">
        {description}
      </div>

    </motion.div>
  );
}