"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="max-w-3xl"
    >
      <p className="warden-kicker">
        {eyebrow}
      </p>

      <h1 className="mt-5 font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
        {title}
      </h1>

      <p className="mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
        {description}
      </p>
    </motion.div>
  );
}