import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const modernCosmo = localFont({
  src: "../../public/fonts/ModernCosmo.ttf",
  variable: "--font-modern-cosmo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "KYN Studio | Architectural Interiors & Design — Bhubaneswar & Cuttack, Odisha",
  description:
    "KYN is a premier interior architecture studio in Odisha, crafting luxury villas, modern duplexes, and corporate spaces across Bhubaneswar, Cuttack, and Puri.",
  keywords: [
    "interior designer bhubaneswar",
    "interior design company odisha",
    "architectural interiors cuttack",
    "luxury villa interior patia bhubaneswar",
    "KYN studio",
    "best interior designer in bhubaneswar",
    "interior design cuttack",
    "turnkey interior design odisha",
    "vastu interior architect bhubaneswar",
  ],
  authors: [{ name: "Studio KYN Architecture & Design Odisha" }],
  creator: "Studio KYN",
  publisher: "Studio KYN Pvt. Ltd.",
  metadataBase: new URL("https://kynstudio.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KYN Studio | Architectural Interiors & Design — Bhubaneswar & Cuttack",
    description:
      "Premier interior architecture studio in Odisha sculpting light, local Khandagiri stone, teak wood, and contemporary luxury across Bhubaneswar and Cuttack.",
    url: "https://kynstudio.in",
    siteName: "KYN Studio Odisha",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "KYN Studio Architectural Interior Design Bhubaneswar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KYN Studio | Interior Architecture Odisha",
    description:
      "Crafting luxury villas, duplexes, and corporate headquarters in Bhubaneswar, Cuttack, and Puri.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured JSON-LD for rich SEO snippets in Odisha, India
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "KYN Interior Architecture & Design Odisha",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "@id": "https://kynstudio.in",
    "url": "https://kynstudio.in",
    "telephone": "+916742974100",
    "priceRange": "₹₹₹₹",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "DLF Cybercity, IDCO Info Park, Patia",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "751024",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "CDA Sector 9, Near Ring Road",
        "addressLocality": "Cuttack",
        "addressRegion": "Odisha",
        "postalCode": "753014",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2961,
      "longitude": 85.8245
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:30",
      "closes": "19:00"
    },
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${modernCosmo.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#07080a] text-[#f8f8f6] flex flex-col font-sans selection:bg-[#c8a47e] selection:text-neutral-950">
        {children}
      </body>
    </html>
  );
}
