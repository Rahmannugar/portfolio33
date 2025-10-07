import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { LoadingProvider } from "@/components/Loader/LoadingProvider";
import { Space_Grotesk } from "next/font/google";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LayoutClient from "./LayoutClient";
import Background from "@/components/custom-ui/background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Nugar.dev",
    template: "%s - Nugar.dev",
  },
  description:
    "Rahmannugar Portfolio website showcasing projects and skills in web development and design.",

  twitter: {
    card: "summary_large_image",
    creator: "@NugarRahman",
  },
  openGraph: {
    type: "website",
    url: "https://rahmannugar.vercel.app",
  },
  keywords: [
    "Adenuga Abdulrahmon",
    "Rahmannugar",
    "Nugar Rahman",
    "Rahman Nugar",
    "33",
    "Nugar.dev",
    "Web Developer",
    "Developer Portfolio",
    "Frontend Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-HH07HBY3GB`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);
            gtag('js', new Date());
            gtag('config', 'G-HH07HBY3GB');
          `}
        </script>
      </head>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <Background />
        <LoadingProvider>
          <LayoutClient>{children}</LayoutClient>
          <SpeedInsights />
          <Analytics />
        </LoadingProvider>
      </body>
    </html>
  );
}
