import "./globals.css";

import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

import Navbar from "./components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "WARDEN — AI Agent Firewall",

  description:
    "WARDEN is a three-layer AI agent firewall protecting autonomous systems from prompt injection, manipulation, and risky autonomous actions.",

  keywords: [
    "AI agent security",
    "AI firewall",
    "prompt injection",
    "LLM security",
    "agent security",
    "AI safety",
    "autonomous agent security",
  ],

  openGraph: {
    title: "WARDEN — AI Agent Firewall",
    description:
      "A three-layer defense system protecting AI agents from prompt injection and risky autonomous actions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}