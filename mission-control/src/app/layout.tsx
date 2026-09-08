import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DataProvider } from "@/lib/store";
import Sidebar from "@/components/Sidebar";

const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SolarBack · Mission Control",
  description: "La squadra di agenti AI di SolarBack, in un colpo d'occhio.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={manrope.variable}>
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
