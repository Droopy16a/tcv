import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import TouchRipple from "./components/TouchRipple";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tcvernouillet.com'),
  title: {
    default: 'TC Vernouillet | Tennis Club de Vernouillet',
    template: '%s | TC Vernouillet',
  },
  description:
    'Le Tennis Club de Vernouillet (TC Vernouillet) vous accueille en Eure-et-Loir (28). Cours de tennis pour adultes et enfants, école de tennis, compétitions et inscriptions en ligne.',
  keywords: [
    'TC Vernouillet',
    'Tennis Club Vernouillet',
    'tennis Vernouillet',
    'club de tennis Vernouillet',
    'école de tennis Vernouillet',
    'cours de tennis Vernouillet',
    'tennis 28',
    'tennis Eure-et-Loir',
    'inscription tennis Vernouillet',
    'compétition tennis Vernouillet',
  ],
  authors: [{ name: 'TC Vernouillet', url: 'https://www.tcvernouillet.com' }],
  creator: 'TC Vernouillet',
  publisher: 'TC Vernouillet',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.tcvernouillet.com',
    siteName: 'TC Vernouillet',
    title: 'TC Vernouillet | Tennis Club de Vernouillet',
    description:
      'Le Tennis Club de Vernouillet vous accueille en Eure-et-Loir. Cours de tennis, école de tennis, compétitions et inscriptions en ligne.',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'TC Vernouillet - Tennis Club de Vernouillet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TC Vernouillet | Tennis Club de Vernouillet',
    description:
      'Le Tennis Club de Vernouillet vous accueille en Eure-et-Loir. Cours, école de tennis et compétitions.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/logo.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  name: 'TC Vernouillet',
  alternateName: 'Tennis Club de Vernouillet',
  url: 'https://www.tcvernouillet.com',
  logo: 'https://www.tcvernouillet.com/images/logo.png',
  image: 'https://www.tcvernouillet.com/images/hero.jpg',
  description:
    'Le Tennis Club de Vernouillet propose des cours de tennis pour tous les niveaux et tous les âges, une école de tennis, des terrains et des compétitions.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vernouillet',
    addressRegion: 'Eure-et-Loir',
    postalCode: '28500',
    addressCountry: 'FR',
  },
  sport: 'Tennis',
  sameAs: [
    'https://www.tcvernouillet.com',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} antialiased`} data-theme="light">
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TouchRipple />
        {children}
      </body>
    </html>
  );
}
