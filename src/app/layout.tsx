import type { Metadata } from "next";
import "./globals.css";
import { BrFirma } from "@/font";
import Providers from "@/lib/helpers/provider";

export const metadata: Metadata = {
  title: "Sidebrief",
  description: "The fastest way for anyone to launch and manage a business from anywhere.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={BrFirma.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
