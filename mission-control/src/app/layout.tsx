import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "@/lib/store";
import Sidebar from "@/components/Sidebar";

const grotesk = localFont({ src: "./fonts/SpaceGrotesk.woff2", variable: "--font-grotesk", weight: "500 700", display: "swap" });
const inter = localFont({ src: "./fonts/Inter.woff2", variable: "--font-inter", weight: "400 700", display: "swap" });

export const metadata: Metadata = {
  title: "SolarBack · Mission Control",
  description: "La squadra di agenti AI di SolarBack, in un colpo d'occhio.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="font-sans">
        <DataProvider>
          <div className="flex min-h-dvh">
            <Sidebar />
            <main className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10">{children}</main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
