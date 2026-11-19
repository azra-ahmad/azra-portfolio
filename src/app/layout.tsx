import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azra Ahmad Algifari",
  description: "A personal corner of the internet by Azra Ahmad Algifari. Selected work, experiments, and a little about me.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
