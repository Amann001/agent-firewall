"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  size = "lg",
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-5 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 24,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
                y: 14,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`pointer-events-auto w-full ${
                size === "xl" ? "max-w-5xl" : "max-w-3xl"
              } max-h-[86vh] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0b0d0c]/95 shadow-[0_30px_100px_rgba(0,0,0,.7)] backdrop-blur-2xl`}
            >
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#e7a83b] to-transparent opacity-70" />

              <div className="flex items-start justify-between border-b border-white/[0.07] px-6 py-5 sm:px-8">
                <div>
                  {eyebrow && (
                    <p className="warden-kicker mb-2">
                      {eyebrow}
                    </p>
                  )}

                  <h2 className="font-display text-xl font-semibold tracking-[-0.025em] text-white sm:text-2xl">
                    {title}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:border-white/[0.16] hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="modal-scroll max-h-[calc(86vh-88px)] overflow-y-auto p-6 sm:p-8">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}