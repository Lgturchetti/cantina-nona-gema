import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import { restaurante } from "@/data/restaurante";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${restaurante.nome} — galeto e massa caseira em Santa Maria`,
  description: restaurante.descricao,
  openGraph: {
    title: restaurante.nome,
    description: restaurante.descricao,
    locale: "pt_BR",
    type: "website",
  },
  // Site de PORTFÓLIO (restaurante fictício): fora do Google para não confundir quem procura restaurante de verdade.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f4f0",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${youngSerif.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
