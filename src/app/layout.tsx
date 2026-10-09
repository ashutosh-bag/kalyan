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

const bounceDash = localFont({
  src: "../../public/fonts/BounceDash.otf",
  variable: "--font-bounce-dash",
  display: "swap",
});

const catalunya = localFont({
  src: "../../public/fonts/Catalunya.otf",
  variable: "--font-catalunya",
  display: "swap",
});

const century751 = localFont({
  src: "../../public/fonts/Century-751-BT.ttf",
  variable: "--font-century",
  display: "swap",
});

const courgette = localFont({
  src: "../../public/fonts/Courgette-Regular.ttf",
  variable: "--font-courgette",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFF3E9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Kalyan Design Studio - Best Interior Design Company in Bhubaneswar, Odisha",
  description:
    "Kalyan Design Studio, Bhubaneswar's top interior designer, transforms spaces with elegant, functional designs. Residential & commercial projects. Call now!",
  keywords: [
    "Interior Design Bhubaneswar",
    "Best Interior Designers in Odisha",
    "Luxury Interior Design Odisha",
    "Home Decor Services Bhubaneswar",
    "Modular Kitchen Bhubaneswar",
    "False Ceiling Odisha",
  ],
  authors: [{ name: "Kalyan Design Studio" }],
  creator: "Kalyan Design Studio",
  publisher: "Kalyan Design Studio",
  metadataBase: new URL("https://kalyandesignstudio.com"),
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
      className={`${century751.variable} ${courgette.variable} ${geistSans.variable} ${geistMono.variable} ${bounceDash.variable} ${catalunya.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[#FFF3E9] text-[#1A1815] flex flex-col font-century selection:bg-[#FF8526] selection:text-white">
        {children}
      </body>
    </html>
  );
}
