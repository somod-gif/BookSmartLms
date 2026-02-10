import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/QueryProvider";

import localFont from "next/font/local";
import { ReactNode } from "react";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { auth } from "@/auth";

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || "http://localhost:3000"
  ),
  title: "Book Smart | University Library Management",
  description:
    "Book Smart is a modern university library management solution for borrowing, tracking, and discovering books. Built for students and staff.",
  authors: [
    {
      name: "Badmus Eniola",
      url: "https://badmus-eniola.vercel.app/",
    },
    { name: "badmus_eniola@gmail.com" },
  ],
  keywords: [
    "Book Smart",
    "library",
    "university library",
    "book borrowing",
    "library management",
    "student portal",
    "Badmus Eniola",
    "Next.js",
    "TypeScript",
    "Drizzle ORM",
    "ImageKit",
    "Upstash",
    "Resend",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Book Smart | University Library Management",
    description:
      "Book Smart is a modern university library management solution for borrowing, tracking, and discovering books. Built for students and staff.",
    url: "https://badmus-eniola .vercel.app/",
    siteName: "Book Smart",
    images: [
      {
        url: "/images/auth-illustration.png",
        width: 1200,
        height: 630,
        alt: "Book Smart Library App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProviderWrapper session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
          suppressHydrationWarning
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </body>
      </SessionProviderWrapper>
    </html>
  );
};

export default RootLayout;
