"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Shield } from "lucide-react";

const navigation = [
  {
    label: "Architecture",
    href: "/architecture",
  },
  {
    label: "Results",
    href: "/results",
  },
  {
    label: "Live Demo",
    href: "/live-demo",
  },
  {
    label: "Events",
    href: "/events",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-32px)] max-w-[1700px] -translate-x-1/2">
      <nav className="warden-navbar">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Warden home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7a83b]/30 bg-[#e7a83b]/[0.035] transition-colors duration-200 group-hover:border-[#e7a83b]/60">
            <Shield
              size={16}
              strokeWidth={1.7}
              className="text-[#e7a83b]"
            />
          </div>

          <span className="font-display text-[15px] font-bold tracking-[-0.03em] text-white">
            WARDEN
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[11px] font-medium transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-white/45 hover:text-white"
                }`}
              >
                {item.label}

                {active && (
                  <span className="absolute -bottom-1 left-1/2 h-px w-4 -translate-x-1/2 bg-[#e7a83b]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* System status */}
          <div className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.018] px-3 py-2 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
              System online
            </span>
          </div>

          {/* Test Warden */}
          <Link
            href="/live-demo"
            className="flex h-10 items-center gap-2 rounded-lg border border-white/80 bg-[#f1f1ee] px-4 text-[11px] font-semibold text-[#0a0b0a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]"
          >
            Test Warden
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </nav>
    </header>
  );
}