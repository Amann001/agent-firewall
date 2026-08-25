"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  {
    label: "Architecture",
    href: "#architecture",
  },
  {
    label: "Results",
    href: "#results",
  },
  {
    label: "Live Demo",
    href: "#demo",
  },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        px-4
        pt-3
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[58px]
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-white/[0.09]
          bg-[#090a0a]/80
          px-4
          shadow-[0_15px_50px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
          sm:px-5
          lg:px-6
        "
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <motion.a
          href="#hero"
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.2,
          }}
          className="shrink-0"
        >
          <Logo />
        </motion.a>

        {/* =====================================================
            CENTER NAVIGATION
        ===================================================== */}

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{
                y: -2,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                py-2
                text-[12px]
                font-medium
                text-white/55
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {item.label}

              {/* Hover underline */}
              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-[#e7a83b]
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </motion.a>
          ))}
        </div>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-2.5">

          {/* System status */}
          <motion.div
            whileHover={{
              y: -2,
              borderColor: "rgba(231,168,59,0.25)",
            }}
            className="
              hidden
              h-9
              items-center
              gap-2
              rounded-lg
              border
              border-white/[0.08]
              bg-white/[0.02]
              px-3
              transition-colors
              duration-300
              sm:flex
            "
          >
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.7)]
              "
            />

            <span className="font-mono text-[8px] tracking-[0.14em] text-white/35">
              SYSTEM ONLINE
            </span>
          </motion.div>

          {/* =================================================
              TEST WARDEN BUTTON
          ================================================= */}

          <motion.a
            href="#demo"
            whileHover={{
              y: -3,
              scale: 1.035,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              group
              relative
              flex
              h-9
              items-center
              gap-2
              overflow-hidden
              rounded-lg
              border
              border-[#e7a83b]
              bg-[#e7a83b]
              px-4
              text-[11px]
              font-semibold
              text-[#080909]
              shadow-[0_8px_25px_rgba(231,168,59,0.10)]
              transition-all
              duration-300
              hover:border-[#f6c86e]
              hover:bg-[#f3bd58]
              hover:shadow-[0_12px_35px_rgba(231,168,59,0.28)]
            "
          >
            {/* Animated shine */}
            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[70%]
                w-[50%]
                skew-x-[-20deg]
                bg-white/25
                transition-all
                duration-700
                group-hover:left-[120%]
              "
            />

            <span className="relative z-10">
              Test Warden
            </span>

            <ArrowUpRight
              size={13}
              strokeWidth={2}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}