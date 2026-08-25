import "./globals.css";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "WARDEN — AI Agent Firewall",
  description:
    "A three-layer defense system protecting AI agents from prompt injection and risky autonomous actions.",
  keywords: [
    "AI agent security",
    "prompt injection",
    "AI firewall",
    "LLM security",
    "agent security",
    "AI safety",
  ],
  openGraph: {
    title: "WARDEN — AI Agent Firewall",
    description:
      "Three layers of defense for autonomous AI agents.",
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