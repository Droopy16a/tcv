import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import Footer from "./components/footer";
import TouchRipple from "./components/TouchRipple";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "TC Vernouillet",
  description: "Tennis Club de Vernouillet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} antialiased`} data-theme="light">
      <body className="min-h-full flex flex-col font-sans">
        <TouchRipple />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
